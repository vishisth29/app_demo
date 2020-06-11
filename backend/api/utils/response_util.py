from api.database import db


def model_as_dict(obj, exclude_cols=[]):
    result = {}
    for col in obj.__table__.columns:
        if col.name in exclude_cols:
            continue
        key = col.name
        value = getattr(obj, col.name)
        result.update({key: value})

    return result


def map_result_to_dict(result):
    if isinstance(result, list):
        return map_array_to_dict(result)

    rv = {}
    keys = result.keys()
    for key, val in zip(keys, result):
        if isinstance(val, db.Model):
            rv.update({key: model_as_dict(val)})
        else:
            rv.update({key: val})
    return rv


def map_array_to_dict(arr):
    rv = []
    for element in arr:
        rv.append(map_result_to_dict(element))
    return rv
