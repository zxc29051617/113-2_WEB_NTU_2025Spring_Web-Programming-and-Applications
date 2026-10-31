import json
from myapp.models import map_object

def json2data():
    json_file = 'myapp/data_2000.json' 

    
    with open(json_file, 'r', encoding='utf-8') as f:
        data_list = json.load(f)

    if not isinstance(data_list, list):
        raise ValueError("JSON wrong: list of dict")

    for entry in data_list:
        required_keys = {'business_status', 'geometry', 'name', 'place_id', 'rating', 'user_ratings_total', 'vicinity'}
        if not required_keys.issubset(entry.keys()):
            print(f"error in data:{entry}")
            continue

        b = entry['business_status']
        gla = entry['geometry']['location']['lat']
        gln = entry['geometry']['location']['lng']
        n = entry['name']
        p = entry['place_id']
        r = entry['rating']
        u = entry['user_ratings_total']
        v = entry['vicinity']
        
        new_object = map_object(business_status=b,geometry_lat=gla,geometry_lng=gln,name=n,place_id=p,rating=r,user_ratings_total=u,vicinity=v)
        new_object.save()
        print("data finish: {entry}")

        pass
    print('done json to data!')
