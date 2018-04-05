<img alt="Census 2010" src="https://github.com/opennyc/opennyc.github.io/blob/master/assets/img/census-2010.png">

# open-nyc-datashader
DataShader back-end for open-nyc

# Prerequisite
1. Install [Anaconda](https://anaconda.org) Python 2.7 version

#Setup
1. Download or clone this project.
2. Download census data:

```shell
chmod 777 get-data.sh
./get-data.sh
```

3. Create anaconda virtual environment: 
```shell
conda env create --file environment.yml
```
4. Activate the created environment in command line:
```shell
source activate opennyc
```
5. Start python server
```shell
python census.py
```

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
