import Preprocesado as pre
import Lenet5 as ln5

import sys
import os
import json

import torch as t
import numpy as np
import pandas as pd

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
rulaAbsoluta=os.path.dirname(os.path.abspath(__file__))
#obtenemos los modelos en conjunto a la ruta absoluta

# imagen de defecto (matriz 64X64 de ceros) 
imagenDefecto=np.zeros((64,64),dtype=np.uint8)

modelos={
    250:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado250.pth"),
    500:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado500.pth"),
    750:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado750.pth"),
    1000:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado1000.pth"),
    2500:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado2500.pth"),
    5000:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado5000.pth"),
    7500:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado7500.pth"),
    10000:os.path.join(rulaAbsoluta,"modelos/modeloEntrenado10000.pth")
}

#leer el archivo "parametros_normalizacion.cvs" para obtener los valores de normalización
#se asume que el archivo se encuentra en el directorio de los modelos
PaNo=pd.read_csv(os.path.join(rulaAbsoluta,"modelos/parametros_normalizacion.csv"),header=0,delimiter="|")

# Funciones auxiliares

def EquivalenciaEnteroAClase(entero):
    return clases_equivalencia[entero]

def EquivalenciaClaseAEntero(clase):
    return clases[clases_equivalencia.index(clase)]

def Normalizar(LCI,LCS,valor):
    # return 10-(valor-abs(LCI))/(LCS-LCI)*10
    return 10-valor/LCS*10

def EmojiCalificacion(calificacion):
    if calificacion>=9:
        return "😀"
    elif calificacion>=8:
        return "🙂"
    elif calificacion>=7:
        return "😐"
    elif calificacion>=6:
        return "😕"
    elif calificacion>=5:
        return "😟"
    elif calificacion>=4:
        return "😞"
    elif calificacion>=3:
        return "😖"
    elif calificacion>=2:
        return "😫"
    elif calificacion>=1:
        return "😩"
    else:
        return "😵"


# Función principal
def Evaluar(directorioEntrada,directorioSalida="./",eco=True):
    global Eco
    Eco=eco

    #revisamos si el archivo de entrada existe
    if not os.path.isfile(directorioEntrada):
        if eco:print("El archivo de entrada no existe")
        return 0
    
    #preprocesamos el archivo (los argumentos han sido seleccionados de forma arbitraria de acuerdo con testeos previos)
    res=pre.Preprocesar(fuente=directorioEntrada,dimensionEntradaIA=2*32,contrastar=False,normalizar=True,eco_=True)    

    dataset=[]
    resultados=[]
    if not res.preprocesadoExitoso:
        if eco:print("El archivo no pudo ser preprocesado correctamente")
        #escribimos en el archivo de salida el error en formato json
        with open(directorioSalida,"w") as archivo:
            json.dump({"estado":False,"error":res.notaDeError},archivo)
        return 0
    else:
        #se crea el dataset
        for i in range(len(res.serie)):
            resultados.append({j:{"error":None,"prediccion":None} for j in modelos})
            resultados[-1]["etiqueta"]=res.serie[i][0]
            print(res.excepciones[i])
            if res.excepciones[i]:
                #el dataset se organiza en tuplas de la forma (etiqueta,imagen), donde la imagen es un tensor de 1x32x32XFactorEscalamiento^2
                dataset.append((EquivalenciaClaseAEntero(res.serie[i][0]),t.tensor(res.serie[i][1],dtype=t.float32)))
            else:
                dataset.append((EquivalenciaClaseAEntero(res.serie[i][0]),t.tensor(imagenDefecto,dtype=t.float32)))
    if eco:print(f"Dataset cargado, elementos: {len(dataset)} ({len(dataset[0][1])}x{len(dataset[0][1][0])})")

    #no se permitirá la ejecución en GPU (porque no se tiene)
    procesador=t.device("cpu")

    #se crea el cargador de datos 
    cargadorDatos=t.utils.data.DataLoader(dataset,batch_size=1,shuffle=False)

    #se evalúa el modelo
    for m in modelos:
        #cargamos el modelo
        modelo=ln5.Lenet5(FactorEscalamiento=2)
        modelo.load_state_dict(t.load(modelos[m],map_location=t.device('cpu')))
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


                indice+=1

    calificacionGl=0
    contadorCalificaciones=0
    for i in range(len(resultados)):

        if not res.excepciones[i]:
            resultados[i]["prediccion"]="No se pudo preprocesar la imagen"
            resultados[i]["calificacion"]=0
            resultados[i]["prediccionCorrecta"]=None
            resultados[i]["emoji"]="⚠️"
            
            for j in modelos: del resultados[i][j]

            continue

        subtotalDeError=0
        modelosAcerados=0
        totalDeError=0

        for j in modelos:
            if resultados[i][j]["prediccion"]==resultados[i]["etiqueta"]:
                subtotalDeError+=resultados[i][j]["error"]
                modelosAcerados+=1
            totalDeError+=resultados[i][j]["error"]

            del resultados[i][j]

        if modelosAcerados>0:
            resultados[i]["calificacion"]=Normalizar(PaNo.loc[EquivalenciaClaseAEntero(resultados[i]['etiqueta'])]['LCI'],PaNo.loc[EquivalenciaClaseAEntero(resultados[i]['etiqueta'])]['LCS'],round(subtotalDeError/modelosAcerados,3))
            resultados[i]['calificacion']=round(resultados[i]['calificacion'],2)
            resultados[i]['calificacion']=abs(resultados[i]['calificacion'])
            resultados[i]["prediccionCorrecta"]=True
            resultados[i]["emoji"]=EmojiCalificacion(resultados[i]["calificacion"])

        else:
            resultados[i]["calificacion"]=Normalizar(PaNo.loc[EquivalenciaClaseAEntero(resultados[i]['etiqueta'])]['LCI'],PaNo.loc[EquivalenciaClaseAEntero(resultados[i]['etiqueta'])]['LCS'],round(totalDeError/len(modelos),3))
            resultados[i]['calificacion']=round(resultados[i]['calificacion'],2)
            resultados[i]['calificacion']=abs(resultados[i]['calificacion'])
            resultados[i]["prediccionCorrecta"]=False
            resultados[i]["emoji"]="❌"

        calificacionGl+=resultados[i]["calificacion"]
        
        contadorCalificaciones+=1
        
    resultados={
        'estado':True,
        'resultados':resultados,
        'calificacionGlobal':abs(round(calificacionGl/contadorCalificaciones,2)),
        'emoji':EmojiCalificacion(abs(round(calificacionGl/contadorCalificaciones,2))) if contadorCalificaciones>0 else '❌'
    }

    if directorioSalida!=None:
        with open(directorioSalida,"w") as archivo:
            json.dump(resultados,archivo)
            if eco:print("Resultados guardados en "+directorioSalida)

    return 0


directorioEntrada=sys.argv[1]
directorioSalida=sys.argv[2]
eco=sys.argv[3]=="True"

if eco:
    print("Directorio de entrada: "+directorioEntrada)
    print("Directorio de salida: "+directorioSalida)
    print("Eco: "+str(eco))

Evaluar(directorioEntrada,directorioSalida,eco=True)