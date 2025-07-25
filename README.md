![the rumbling](public/eren.png)

# Attack on Titan API - Shinzou wo Sasageyo!

*"Beyond that wall, is the freedom I've longed for... the data I've always sought."*

Welcome to the enhanced [Attack on Titan API](https://www.attackontitanapi.com/) - a comprehensive RESTful API that brings the world of Paradis Island and Marley to your fingertips. Explore detailed information about characters, episodes, locations, organizations, and titans from the epic saga that has captivated millions worldwide. Like the walls that once protected humanity, this API stands ready to serve your project needs - and it's completely free with no API key required.

## History

This repository is a fork of the original [Attack on Titan API](https://github.com/ZachMcM/attack-on-titan-api-site) created by **ZachMcM**. Like the inheritance of the Nine Titans, I've taken this powerful foundation and enhanced it with new features and improvements while honoring the original creator's vision.

## Comprehensive API Documentation

Our API covers all details of the Attack on Titan universe. Here's the information available in our dataset:

### Characters - 201 entries
From Eren Jaeger to Mikasa Ackerman, Levi to Erwin Smith, detailed information about all major characters:
- Basic information (name, age, gender)
- Character aliases
- Species (human, titan)
- Family relationships
- Birth places and residences
- Occupations and affiliated groups
- Episodes they appear in

### Episodes - 88 entries
All anime episodes:
- Episode name and number
- Broadcast date
- Characters appearing in the episode

### Locations - 36 entries
From Shiganshina to Marley, all important places:
- Territory and region information
- Notable inhabitants
- First appearance

### Organizations - 15 entries
From the Scout Regiment to the Warriors, all groups:
- Detailed descriptions
- Affiliations
- Notable members

### Titans - 10 entries
All Nine Titans and their powers:
- Height information
- Abilities
- Current and former inheritors
- Allegiances

## Getting Started

To start using the API, use the main endpoint:

```
http://attack-on-titan-wiki-api.vercel.app
```

Example request to get Eren Jaeger's data:
```
GET http://attack-on-titan-wiki-api.vercel.app/characters/188
```

Filtering examples:
```
GET http://attack-on-titan-wiki-api.vercel.app/characters?status=alive&occupation=soldier
GET http://attack-on-titan-wiki-api.vercel.app/titans?allegiance=Eldia
```

The complete API documentation is detailed in the `docs.md` file. This documentation includes data schemas and all API endpoints:

- Filtering characters (by name, gender, status, occupation)
- Filtering episodes (by episode number, name)
- Filtering locations (by name, territory, region)
- Filtering organizations (by name, affiliation)
- Filtering titans (by name, allegiance)

## Join the Fight!

Like the Warriors and Eldians who eventually joined forces, you can contribute to this project too! Feel free to submit issues, improve the data, or enhance the functionality.

## Original Website

Check out the code for the original website built by ZachMcM [here](https://github.com/ZachMcM/attack-on-titan-api-site).

---

*"If you win, you live. If you lose, you die. If you don't fight, you can't win!"* - Eren Jaeger

TATAKAE! TATAKAE!



