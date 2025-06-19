import pandas as pd

# load once on import
_df = pd.read_csv("ufc_master_data.csv")
_df['weight'] = _df['weight'].astype(str).str.strip()

def get_names_by_weight(weight: str):
    return _df.loc[_df['weight'] == weight, 'name'].tolist()
