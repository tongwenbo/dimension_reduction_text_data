# Dimension Reduction

This project contains 3 parts:
1. data pre-processing and dimensionality reduction
2. load data to sqlite database and retrive them with flask server
3. visualization

## Data preprocessing and dimension reduction
use `cd .\dimension_reduction\` first to navigate to this folder<br/>
To use the python scripts provided to you make sure you have Python >=3.7 installed.<br/>
Other than the environment setup you provided, install the following packages for usage:
1. `pip install matplotlib`
2. `pip install nltk`
3. `pip install scikit-learn`<br/>
<br/>

To load the data to the database, just run the script data_to_sqlite.ipydb. Remember using runAll.<br/>
To initialize the flask server, use `python .\server.py`

### data-processing_and_dimension_reduction.ipynb and paper.xlsx
Data preprocessing script using 2 dimension reduction methods PCA and t-SNE and the raw data.<br/>
It contains all the preprocessing steps of 2 columns 'abstract' and 'AuthorName-Deduped' with 2 dimension reduction medthod PCA and t-SNE. Furthermore, it contains an Implementation of PCA by hand.

### TSNE_from_scratch.py
It contains the script of an Implementation of t-SNE by hand.
- Why seperated from PCA?
- Running time is too long to put together in the jupyter notebook. Detail information in the last part of data-processing_and_dimension_reduction.ipynb.

### data_to_sqlite.ipydb and data.db
The script that creates the database and the database.

### server.py
The initiation script of the flask server. It reads the data from the database created.

### folder data_for_vis
It contains the .csv files generated for visualization.


## Visualization
1. use `cd .\visualization\` first to navigate to this folder.
2. run `npm install` and `npm run dev` to start it.

The visualization allows user to choose 3 parameters to see the output graph the user wants to see.
### category
Which category can be used to define a "good paper".
### dr method
Which dimension reduction method the user wants to use.
### column
Which column user wants to analyze.
