import requests

BASE_URL = "https://your-api-url.com/api/buildings"
HEADERS = {
    "Authorization": "Bearer {token}",  # Thay {token} bằng token thật
    "Content-Type": "application/json"
}

def create_building(construction_year, number_of_floors, number_of_apartments, amenities, active=True):
    url = f"{BASE_URL}/create"
    payload = {
        "constructionYear": construction_year,
        "numberOfFloors": number_of_floors,
        "numberOfApartments": number_of_apartments,
        "amenities": amenities,
        "active": active
    }
    response = requests.post(url, json=payload, headers=HEADERS)
    return response.json(), response.status_code

def update_building(building_id, construction_year=None, number_of_floors=None, number_of_apartments=None, amenities=None, active=None):
    url = f"{BASE_URL}/{building_id}/update"
    payload = {
        "constructionYear": construction_year,
        "numberOfFloors": number_of_floors,
        "numberOfApartments": number_of_apartments,
        "amenities": amenities,
        "active": active
    }
    payload = {k: v for k, v in payload.items() if v is not None}
    response = requests.put(url, json=payload, headers=HEADERS)
    return response.json(), response.status_code

def get_building_details(building_id):
    url = f"{BASE_URL}/{building_id}"
    response = requests.get(url, headers=HEADERS)
    return response.json(), response.status_code

def soft_delete_building(building_id):
    url = f"{BASE_URL}/{building_id}/delete"
    payload = {"active": False}
    response = requests.patch(url, json=payload, headers=HEADERS)
    return response.json(), response.status_code

def list_all_buildings(page=1, limit=10, active=None):
    url = f"{BASE_URL}"
    params = {
        "page": page,
        "limit": limit
    }
    if active is not None:
        params["active"] = active
    response = requests.get(url, headers=HEADERS, params=params)
    return response.json(), response.status_code
