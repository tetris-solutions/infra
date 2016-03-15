#!/usr/bin/env bash

git clone git@github.com:tetris-solutions/infra.git

cd infra

echo 'npm login'
if [ -f ~/.npmrc ]
then
  echo 'npm is already logged in'
else
  npm login
fi

npm install

if [ -f .env ]
then
  echo "Arquivo .env encontrado."
else
  
  echo "Por favor, visite a seguinte url:"
  echo "http://bit.ly/tetris-dotenv"
  echo "salvando o arquivo na raiz do projeto 'infra'."
  
  while true; do
    read -p "Você já baixo o arquivo e editou os valores necessários? [S/N]: " sn
    case $sn in
      [Ss]* ) break;;
      [Nn]* ) exit 1;;
      * ) echo "Opção inválida.";;
    esac
  done
  
fi

npm run build
source ./bash.env

echo "Instalando..."

# Download projects from github
git clone git@github.com:tetris-solutions/main-front.git ../main-front &
git clone git@github.com:tetris-solutions/user-api.git ../user-api &
wait
echo 'Cloned projects...'

# host management
sudo npm install --global hostile

# Install project dependencies
(cd ../user-api && npm install) &
(cd ../main-front && npm install) &
wait
echo 'Installed projects'

npm run setup

chmod -R 777 elk

docker-compose up &
(cd ../user-api && sleep 5 && exec npm run start-dev) &
(cd ../main-front && exec npm start) &

wait
echo "Servidor iniciado, você pode visitar:"
echo $FRONT_URL
