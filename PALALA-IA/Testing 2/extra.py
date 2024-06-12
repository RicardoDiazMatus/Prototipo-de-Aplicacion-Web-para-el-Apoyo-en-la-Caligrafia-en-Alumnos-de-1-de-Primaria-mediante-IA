import torch
import Lenet5 as ln5
import pandas as pd

#armaremos un arreglo de casos de prueba
# matrices:
# 1. matriz de 1s
# 2. matriz de 0s
# 3. matriz de ruído (random)
# 4. otra matriz de ruído (random)
# 5. otra matriz de ruído (random)
# 6. matriz de 0.5s
clases_equivalencia=ln5.clases_equivalencia
clases=range(len(clases_equivalencia))
modelos={
    10:"./modeloEntrenado10.pth",
    25:"./modeloEntrenado25.pth",
    50:"./modeloEntrenado50.pth",
    75:"./modeloEntrenado75.pth",
    100:"./modeloEntrenado100.pth",
    250:"./modeloEntrenado250.pth",
    500:"./modeloEntrenado500.pth",
    502:"./modeloEntrenado502.pth",
    750:"./modeloEntrenado750.pth",
    1000:"./modeloEntrenado1000.pth",
    1002:"./modeloEntrenado1002.pth",
    2500:"./modeloEntrenado2500.pth",
    5000:"./modeloEntrenado5000.pth",
    5002:"./modeloEntrenado5002.pth",
    7500:"./modeloEntrenado7500.pth",
    10000:"./modeloEntrenado10000.pth",
    10002:"./modeloEntrenado10002.pth"
}

dimension=2*32
dimensiones=(dimension,dimension)

pruebasAleatorias=1000
casos_prueba = [torch.tensor(torch.rand(dimensiones),dtype=torch.float32) for i in range(pruebasAleatorias)]

# dataset=[list((c,cp) for cp in casos_prueba) for c in clases] 
dataset = [(clase, caso) for clase in clases for caso in casos_prueba]

#diccionario para guardar el peor resultado de la evaluación por clase
# procesador=torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
# procesador=torch.device("cpu")
procesador=torch.device("cuda:0")
cargadorDatos=torch.utils.data.DataLoader(dataset,batch_size=1,shuffle=False)
#almacenamos los resultados en un dataframe
columnas=['etiqueta']+[f"CP{i}" for i in range(len(casos_prueba))]

df=pd.DataFrame(columns=columnas)
df['etiqueta']=clases_equivalencia
for i in range(len(casos_prueba)):
    df[f"CP{i}"]=0

for m in modelos:
    #cargamos el modelo
    modelo=ln5.Lenet5(FactorEscalamiento=2).to(procesador)
    modelo.load_state_dict(torch.load(modelos[m]))
    modelo.eval()
    print(f"Modelo {modelos[m]} cargado")
    with torch.no_grad():
        indice=0
        for etiquetas, imagenes in cargadorDatos:


            imagenes=imagenes.to(procesador)
            etiquetas=etiquetas.to(procesador)

            etiqueta=etiquetas.item()
            error=modelo.error(modelo(imagenes),etiquetas)
            df.at[etiqueta,f"CP{indice}"]+=error.item()/len(modelos)
            indice+=1
            indice%=len(casos_prueba)

#guardamos los resultados en un archivo csv
df.to_csv("./resultados3.csv",index=False,sep="|")

