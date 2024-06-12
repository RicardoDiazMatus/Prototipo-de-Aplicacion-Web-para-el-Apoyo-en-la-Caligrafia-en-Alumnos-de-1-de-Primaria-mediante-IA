import Preprocesado as pre
import Lenet5 as ln5

import sys
import os
import json

import torch as t
import numpy as np
from scipy import stats

Eco=True

# Leer los argumentos de la línea de comandos
# los argumentos son:
#   1. directorio del dataset (archivo imagen)
#   2. directorio del modelo (archivo pth)
#   3. directorio de los metadatos (archivo json)
#   4. eco  (True o False)

# Valores constantes
clases_equivalencia=ln5.clases_equivalencia
clases=range(len(clases_equivalencia))
modelos={
    250:"./modeloEntrenado250.pth",
    500:"./modeloEntrenado502.pth",
    750:"./modeloEntrenado750.pth",
    1000:"./modeloEntrenado1002.pth",
    2500:"./modeloEntrenado2500.pth",
    5000:"./modeloEntrenado5002.pth",
    7500:"./modeloEntrenado7500.pth",
    10000:"./modeloEntrenado10002.pth"
}

# Funciones auxiliares
def EquivalenciaEnteroAClase(entero):
    return clases_equivalencia[entero]

def EquivalenciaClaseAEntero(clase):
    return clases[clases_equivalencia.index(clase)]

# Función principal
def Evaluar(directorioEntrada,directorioSalida="./",eco=True):
    global Eco
    Eco=eco

    #revisamos si el archivo de entrada existe
    if not os.path.isfile(directorioEntrada):
        print("El archivo de entrada no existe")
        return 0
    
    #preprocesamos el archivo (los argumentos han sido seleccionados de forma arbitraria de acuerdo con testeos previos)
    res=pre.Preprocesar(fuente=directorioEntrada,dimensionEntradaIA=2*32,contrastar=False,normalizar=True,eco_=eco)    

    dataset=[]
    resultados=[]
    if not res.preprocesadoExitoso:
        print("El archivo no pudo ser preprocesado correctamente")
        #escribimos en el archivo de salida el error en formato json
        with open(directorioSalida,"w") as archivo:
            json.dump({"estado":False,"error":res.error},archivo)
        return 0
    else:
        #se crea el dataset
        for i in range(len(res.serie)):
            #el dataset se organiza en tuplas de la forma (etiqueta,imagen), donde la imagen es un tensor de 1x32x32XFactorEscalamiento^2
            resultados.append({j:{"error":None,"prediccion":None} for j in modelos})
            resultados[-1]["etiqueta"]=res.serie[i][0]
            dataset.append((EquivalenciaClaseAEntero(res.serie[i][0]),t.tensor(res.serie[i][1],dtype=t.float32)))
    if eco:print(f"Dataset cargado, elementos: {len(dataset)} ({len(dataset[0][1])}x{len(dataset[0][1][0])})")

    #no se permitirá la ejecución en GPU (porque no se tiene)
    procesador=t.device("cpu")

    #se crea el cargador de datos 
    cargadorDatos=t.utils.data.DataLoader(dataset,batch_size=1,shuffle=False)

    #se evalúa el modelo
    for m in modelos:
        #cargamos el modelo
        modelo=ln5.Lenet5(FactorEscalamiento=2)
        modelo.load_state_dict(t.load(modelos[m]))
        modelo.eval()
        if eco:print(f"Modelo {modelos[m]} cargado")
        with t.no_grad():
            indice=0
            for etiquetas, imagenes in cargadorDatos:
                imagenes=imagenes.to(procesador)
                etiquetas=etiquetas.to(procesador)

                etiqueta=EquivalenciaEnteroAClase(etiquetas.item())

                #se obtiene el tensor de salida
                salidas=modelo(imagenes).flatten().numpy()

                #se calcura el error
                error=modelo.error(modelo(imagenes),etiquetas)

                #se guarda el resultado
                resultados[indice][m]['error']=error.item()
                resultados[indice][m]['prediccion']=EquivalenciaEnteroAClase(np.argmax(salidas))
                if etiquetas.item()==np.argmax(salidas):
                    print(f"Predicción correcta: {etiquetas.item()} {m}") 

                """ el diccionario de resultados parciales tiene la forma:
                    resultados={
                        indice1:{
                            "etiqueta":etiqueta,
                            modelo1:{
                                "error":error,
                                "prediccion":prediccion
                            },
                            modelo2:{
                                "error":error,
                                "prediccion":prediccion
                            },
                            ...
                        },
                        indice2:{
                            "etiqueta":etiqueta,
                            modelo1:{
                                "error":error,
                                "prediccion":prediccion
                            },
                            modelo2:{
                                "error":error,
                                "prediccion":prediccion
                            },
                            ...
                        },
                        ...
                    } """
                
                indice+=1

    for i in range(len(resultados)):
        subtotalDeError=0
        modelosAcerados=0
        totalDeError=0
        mejor_prediccion=10000

        for j in modelos:
            if resultados[i][j]["prediccion"]==resultados[i]["etiqueta"]:
                subtotalDeError+=resultados[i][j]["error"]
                modelosAcerados+=1
                if mejor_prediccion>resultados[i][j]["error"]:
                    mejor_prediccion=resultados[i][j]["error"]
            totalDeError+=resultados[i][j]["error"]

            del resultados[i][j]

        if modelosAcerados>0:
            # resultados[i]["calificacion"]=subtotalDeError/modelosAcerados
            resultados[i]["calificacion"]=mejor_prediccion
            resultados[i]['prediccion']=True
        else:
            resultados[i]["calificacion"]=totalDeError/len(modelos)
            resultados[i]['prediccion']=False
            # resultados[i]["calificacion"]=-100

    #se calcula la calificación final
    calificacionFinal=0
    for i in range(len(resultados)):
        calificacionFinal+=resultados[i]["calificacion"]

    calificacionFinal/=len(resultados)

    #se guarda el resultado en un diccionario
    dic_resultado={
        "calificacion":calificacionFinal,
        "resultados":resultados
    }

    # #se guardan los resultados en directorioEntrada en un json
    if directorioSalida!=None:
        with open(directorioSalida+".json","w") as archivo:
            json.dump(dic_resultado,archivo)
            if eco:print("Resultados guardados en "+directorioSalida+".json")

    return 0

#para cada archivo de "CasosReales"
for archivo in os.listdir("./CasosReales"):
    #evitar los .json
    if archivo[-5:]==".json":
        continue
    #se evalúa el archivo
    Evaluar("./CasosReales/"+archivo,"./CasosReales/"+archivo+"_res",eco=Eco)
    if Eco:print(f"Archivo {archivo} evaluado")