# Dimension Reduction

This folder contains all files for assignment 4.<br/>

## Data preprocessing and dimension reduction
use `cd .\dimension_reduction\` first to navigate to this folder<br/>
To use the python scripts provided to you make sure you have Python >=3.7 installed.<br/>
Other than the environment setup you provided, install the following packages for usage:
1. `pip install matplotlib`
2. `pip install nltk`
3. `pip install scikit-learn`

### task_1_d.ipynb and paper.xlsx
Data preprocessing script from Task 1(d) and the raw data.
It contains all the preprocessing steps of 2 columns 'abstract' and 'AuthorName-Deduped' with 2 dimension reduction medthod PCA and t-SNE. Furthermore, it contains Task 4(a): implementation of PCA by hand.

### task4_b_TSNE.py
It contains the script of Task 4(b): implementation of t-SNE by hand.
- Why seperated?
- Running time is too long to put together in the jupyter notebook. Detail information in the last part of task_1_d.ipynb.

### server.py
The initiation script of the flask server.

### data_to_sqlite.ipydb and data.db
The script that creates the database and the database.

### folder data_for_vis
It contains the .csv files generated for visualization.


## Visualization
use `cd .\python\` first to navigate to this folder.
run `npm install` and `npm run dev` to start it.

The visualization allows user to choose 3 parameters to see the output graph the user wants to see.
### category
Which category can be used to define a "good paper".
### dr method
Which dimension reduction method the user wants to use.
### column
Which column user wants to analyze.
