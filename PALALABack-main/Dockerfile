# Utiliza una imagen base de node.js
FROM node:latest

RUN apt-get update 
RUN apt update && apt upgrade -y

# Instalar node.js
# RUN apt install -y nodejs

# Instalar npm
RUN apt install -y npm

# you can specify python version during image build
ARG PYTHON_VERSION=3.10.7

# download and extract python sources
RUN cd /opt \
    && wget https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz \                                              
    && tar xzf Python-${PYTHON_VERSION}.tgz

# build python and remove left-over sources
RUN cd /opt/Python-${PYTHON_VERSION} \ 
    && ./configure --prefix=/usr --enable-optimizations --with-ensurepip=install \
    && make install \
    && rm /opt/Python-${PYTHON_VERSION}.tgz /opt/Python-${PYTHON_VERSION} -rf
                                                                                
# install pip
RUN python3 -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip3 install --upgrade pip setuptools wheel \
    && pip3 install --upgrade pip

# Establece el directorio de trabajo en /app
WORKDIR /usr/src/app

# Copia el contenido actual del directorio al contenedor en /app
COPY . .

# Instala las dependencias de Python y Node.js
# se instala torch y torchvision con la version de cpu por este medio para evitar que se instale la version de gpu
RUN pip install torch==2.0.1 torchvision==0.15.2  --index-url https://download.pytorch.org/whl/cpu

# install zbar
RUN apt-get install libzbar-dev -y
RUN pip install -r requirements.txt 
RUN npm install

# Expone el puerto 80
ENV PORT=8000

EXPOSE 8000

# Especifica el comando por defecto para ejecutar tu aplicación
CMD ["node", "app.js"]


# Comando para construir la imagen
# docker build -t palala-image  .

# Comando para taggear la imagen
# docker tag palala-image aelgdocker/palala-back

# Comando para subir la imagen
# docker push aelgdocker/palala-back

# Comando para correr la imagen
# docker run -p 8000:0080 -d aelgdocker/palala-back sh -c "node app.js"
