import json
# Read JSON data from 'peas.json' file
with open('jsonout.json', 'r') as json_file:
    data = json.load(json_file)

# Extract "clean_text" values with specific keys
extracted_data = {}
for line in data["System Information"]["sections"]["Basic System Information"]["lines"]:
    colon_index = line["clean_text"].index(":")
    key = line["clean_text"][:colon_index].strip()
    value = line["clean_text"][colon_index + 1:].strip()
    extracted_data[key] = value

# Filter the extracted data to display only required keys
required_keys = ["OS Name", "OS Version", "Hostname", "Current Time"]
filtered_data = {key: extracted_data[key] for key in required_keys if key in extracted_data}

# Save the filtered data to a new JSON file
with open("sysInfo.json", "w") as outfile:
    json.dump(filtered_data, outfile, indent=2)

print("Extracted clean_text values with specific keys (OS Name, OS Version, Hostname, and Current Time) have been stored in 'sysInfo.json' file.")