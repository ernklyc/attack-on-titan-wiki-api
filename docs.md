# Attack on Titan API Dokümantasyonu

## Ana Endpoint

API'ye erişmek için ana endpoint:

```
http://attack-on-titan-wiki-api.vercel.app
```

## Karakterler (Characters)

Toplam 201 karakter ve 11 sayfa vardır.

### Karakter Şeması

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| id | int | Karakterin ID'si |
| name | string | Karakterin adı |
| img | string | Karakterin resmine URL |
| alias | string[] | Karakterin takma adları |
| species | string[] | Karakterin türleri |
| gender | string | Karakterin cinsiyeti |
| age | int | Karakterin yaşı |
| height | string | Karakterin boyu |
| relatives | object[] | Karakterin aileleri ve akrabaları |
| birthplace | string | Karakterin doğum yeri |
| residence | string | Karakterin ikamet yeri |
| status | string | Karakterin durumu (alive veya dead) |
| occupation | string | Karakterin mesleği |
| groups | object[] | Karakterin dahil olduğu gruplar |
| roles | string[] | Karakterin rolleri |
| episodes | string[] | Karakterin göründüğü bölümler |

### Tüm Karakterleri Getir

`/characters` endpointi kullanarak tüm karakterlere erişebilirsiniz.

```
GET http://attack-on-titan-wiki-api.vercel.app/characters
```

Örnek Yanıt:
```json
{
    "info": {
      "count": 201,
      "pages": 11,
      "next_page": "http://attack-on-titan-wiki-api.vercel.app/characters?page=2",
      "prev_page": null
    },
    "results": [
      {
        "id": 1,
        "name": "Armin Arlelt",
        "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/9/93/Armin_Arlelt_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20210322005647",
        "alias": [
          "Colossal Titan"
        ],
        "species": [
          "Human",
          "Intelligent Titan"
        ],
        "gender": "Male",
        "age": 19,
        "height": "60 m (Colossal Titan form)",
        "relatives": [
          {
            "family": "Arlelt family",
            "members": [
              "Unnamed father",
              "Unnamed mother",
              "Unnamed grandfather"
            ]
          }
        ],
        "birthplace": "Shiganshina District",
        "residence": "Wall Rose",
        "status": "Alive",
        "occupation": "Soldier",
        "groups": [
          {
            "name": "Scout Regiment",
            "sub_groups": [
              "Special Operations Squad"
            ]
          }
        ],
        "roles": [
          "Colossal Titans",
          "Scout Regiment Commanders"
        ],
        "episodes": [
          "http://attack-on-titan-wiki-api.vercel.app/episodes/1",
          "http://attack-on-titan-wiki-api.vercel.app/episodes/2",
          "http://attack-on-titan-wiki-api.vercel.app/episodes/3",
          "http://attack-on-titan-wiki-api.vercel.app/episodes/4",
          "..."
        ]
      },
      "..."
    ]
}
```

### Tek Bir Karakter Getir

İstek parametresi olarak ID ekleyerek `/characters/188` tek bir karakteri getirebilirsiniz.

```
GET http://attack-on-titan-wiki-api.vercel.app/characters/188
```

Örnek Yanıt:
```json
{
    "id": 188,
    "name": "Eren Jaeger",
    "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a1/Eren_Jaeger_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20220123225500",
    "alias": [
      "Suicidal Maniac",
      "Titan boy",
      "Attack Titan",
      "Mysterious Titan",
      "Berserk Titan",
      "Founding Titan",
      "Founder",
      "Mister Kruger",
      "Usurper",
      "War Hammer Titan",
      "Doomsday Titan"
    ],
    "species": [
      "Human",
      "Intelligent Titan"
    ],
    "gender": "Male",
    "age": 19,
    "height": "15 m (Titan form)",
    "relatives": [
      {
        "family": "Jaeger family",
        "members": [
          "http://attack-on-titan-wiki-api.vercel.app/characters/160",
          "http://attack-on-titan-wiki-api.vercel.app/characters/161",
          "http://attack-on-titan-wiki-api.vercel.app/characters/184",
          "http://attack-on-titan-wiki-api.vercel.app/characters/173",
          "Unnamed grandmother",
          "http://attack-on-titan-wiki-api.vercel.app/characters/181"
        ]
      }
    ],
    "birthplace": "Shiganshina District",
    "residence": "Wall Rose",
    "status": "Alive",
    "occupation": "Soldier",
    "groups": [],
    "roles": [
      "Attack Titans",
      "Founding Titans",
      "War Hammer Titans"
    ],
    "episodes": [
      "http://attack-on-titan-wiki-api.vercel.app/episodes/1",
      "http://attack-on-titan-wiki-api.vercel.app/episodes/2",
      "http://attack-on-titan-wiki-api.vercel.app/episodes/3",
      "..."
    ]
}
```

### Birden Fazla Karakter Getir

İstek parametresi olarak `/characters/188,1` şeklinde ID listesi ekleyerek birden fazla karakteri getirebilirsiniz.

```
GET http://attack-on-titan-wiki-api.vercel.app/characters/188,1
```

Örnek Yanıt:
```json
[
    {
      "id": 59,
      "name": "Duran",
      "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/b/b2/Duran_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20180730213708",
      "alias": [],
      "species": [
        "Human"
      ],
      "gender": "Male",
      "age": null,
      "height": null,
      "relatives": [],
      "birthplace": null,
      "residence": "Wall Sina",
      "status": "Deceased",
      "occupation": "Soldier",
      "groups": [
        {
          "name": "Military Police Regiment",
          "sub_groups": [
            "Anti-Personnel Control Squad"
          ]
        }
      ],
      "roles": [],
      "episodes": [
        "http://attack-on-titan-wiki-api.vercel.app/episodes/38",
        "http://attack-on-titan-wiki-api.vercel.app/episodes/39",
        "http://attack-on-titan-wiki-api.vercel.app/episodes/43"
      ]
    },
    {
      "id": 188,
      "name": "Eren Jaeger",
      "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/a/a1/Eren_Jaeger_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20220123225500",
      "alias": [
        "Suicidal Maniac",
        "Titan boy",
        "Attack Titan",
        "Mysterious Titan",
        "Berserk Titan",
        "Founding Titan",
        "Founder",
        "Mister Kruger",
        "Usurper",
        "War Hammer Titan",
        "Doomsday Titan"
      ],
      "species": [
        "Human",
        "Intelligent Titan"
      ],
      "gender": "Male",
      "age": 19,
      "height": "15 m (Titan form)",
      "relatives": [
        {
          "family": "Jaeger family",
          "members": [
            "http://attack-on-titan-wiki-api.vercel.app/characters/160",
            "http://attack-on-titan-wiki-api.vercel.app/characters/161",
            "http://attack-on-titan-wiki-api.vercel.app/characters/184",
            "http://attack-on-titan-wiki-api.vercel.app/characters/173",
            "Unnamed grandmother",
            "http://attack-on-titan-wiki-api.vercel.app/characters/181"
          ]
        }
      ],
      "birthplace": "Shiganshina District",
      "residence": "Wall Rose",
      "status": "Alive",
      "occupation": "Soldier",
      "groups": [],
      "roles": [
        "Attack Titans",
        "Founding Titans",
        "War Hammer Titans"
      ],
      "episodes": [
        "http://attack-on-titan-wiki-api.vercel.app/episodes/1",
        "http://attack-on-titan-wiki-api.vercel.app/episodes/2",
        "http://attack-on-titan-wiki-api.vercel.app/episodes/3",
        "..."
      ]
    }
]
```

### Karakterleri Filtrele

Karakterleri filtrelemek için isteğe bir sorgu ekleyebilirsiniz. `?` ekleyip ardından `<sorgu>=<değer>` gelir. Birden fazla sorguyu zincirlemek için `&` ile ayırın.

Kullanılabilir parametreler:

- **name**: İsme göre filtrele
- **gender**: Cinsiyete göre filtrele (male, female veya unknown)
- **status**: Duruma göre filtrele (alive, deceased veya unknown)
- **occupation**: Mesleğe göre filtrele (soldier, thug, vb.)

```
GET http://attack-on-titan-wiki-api.vercel.app/characters?status=alive&occupation=soldier
```

Örnek Yanıt:
```json
{
    "info": {
      "count": 26,
      "pages": 2,
      "next_page": "http://attack-on-titan-wiki-api.vercel.app/characters?page=2?status=alive&occupation=soldier",
      "prev_page": null
    },
    "results": [
      {
        "id": 1,
        "name": "Armin Arlelt",
        "img": "https://static.wikia.nocookie.net/shingekinokyojin/images/9/93/Armin_Arlelt_%28Anime%29_character_image.png/revision/latest/scale-to-width-down/350?cb=20210322005647",
        "alias": [
          "Colossal Titan"
        ],
        "species": [
          "Human",
          "Intelligent Titan"
        ],
        "gender": "Male",
        "age": 19,
        "height": "60 m (Colossal Titan form)",
        "relatives": [
          {
            "family": "Arlelt family",
            "members": [
              "Unnamed father",
              "Unnamed mother",
              "Unnamed grandfather"
            ]
          }
        ],
        "birthplace": "Shiganshina District",
        "residence": "Wall Rose",
        "status": "Alive",
        "occupation": "Soldier",
        "groups": [
          {
            "name": "Scout Regiment",
            "sub_groups": [
              "Special Operations Squad"
            ]
          }
        ],
        "roles": [
          "Colossal Titans",
          "Scout Regiment Commanders"
        ],
        "episodes": [
          "http://attack-on-titan-wiki-api.vercel.app/episodes/1",
          "http://attack-on-titan-wiki-api.vercel.app/episodes/2",
          "http://attack-on-titan-wiki-api.vercel.app/episodes/3",
          "..."
        ]
      },
      "..."
    ]
}
```

## Bölümler (Episodes)

Toplam 88 bölüm bulunmaktadır.

### Bölüm Şeması

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| id | int | Bölümün ID'si |
| name | string | Bölümün adı |
| img | string | Bölümün resmine URL |
| episode | string | Bölüm numarası (Sezon.Bölüm) |
| airing | string | Yayın tarihi |
| characters | string[] | Bölümde görünen karakterler |

### Tüm Bölümleri Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/episodes
```

### Tek Bir Bölüm Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/episodes/1
```

### Birden Fazla Bölüm Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/episodes/1,2
```

### Bölümleri Filtrele

Kullanılabilir parametreler:
- **episode**: Bölüm numarasına göre filtrele
- **name**: İsme göre filtrele

```
GET http://attack-on-titan-wiki-api.vercel.app/episodes?episode=1.01
```

## Konumlar (Locations)

Toplam 36 konum bulunmaktadır.

### Konum Şeması

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| id | int | Konumun ID'si |
| name | string | Konumun adı |
| img | string | Konumun resmine URL |
| territory | string | Bölge |
| region | string | Alt bölge |
| notable_inhabitants | string[] | Önemli sakinler |
| notable_former_inhabitants | string[] | Önemli eski sakinler |
| debut | string | İlk göründüğü bölüm |

### Tüm Konumları Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/locations
```

### Tek Bir Konum Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/locations/1
```

### Birden Fazla Konum Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/locations/1,2
```

### Konumları Filtrele

Kullanılabilir parametreler:
- **name**: İsme göre filtrele
- **territory**: Bölgeye göre filtrele
- **region**: Alt bölgeye göre filtrele

```
GET http://attack-on-titan-wiki-api.vercel.app/locations?territory=Wall Maria
```

## Organizasyonlar (Organizations)

Toplam 15 organizasyon bulunmaktadır.

### Organizasyon Şeması

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| id | int | Organizasyonun ID'si |
| name | string | Organizasyonun adı |
| img | string | Organizasyonun resmine URL |
| description | string | Organizasyonun açıklaması |
| affiliation | string | Bağlı olduğu taraf |
| notable_members | string[] | Önemli üyeler |
| notable_former_members | string[] | Önemli eski üyeler |
| debut | string | İlk göründüğü bölüm |

### Tüm Organizasyonları Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/organizations
```

### Tek Bir Organizasyon Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/organizations/1
```

### Birden Fazla Organizasyon Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/organizations/1,2
```

### Organizasyonları Filtrele

Kullanılabilir parametreler:
- **name**: İsme göre filtrele
- **affiliation**: Bağlı olduğu tarafa göre filtrele

```
GET http://attack-on-titan-wiki-api.vercel.app/organizations?affiliation=Marley
```

## Titanlar (Titans)

Toplam 10 titan bulunmaktadır.

### Titan Şeması

| Anahtar | Tip | Açıklama |
|---------|-----|----------|
| id | int | Titanın ID'si |
| name | string | Titanın adı |
| img | string | Titanın resmine URL |
| height | string | Titanın boyu |
| abilities | string[] | Titanın yetenekleri |
| current_inheritor | string | Şu anki sahibi |
| former_inheritors | string[] | Önceki sahipleri |
| allegiance | string | Bağlılığı |

### Tüm Titanları Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/titans
```

### Tek Bir Titan Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/titans/1
```

### Birden Fazla Titan Getir

```
GET http://attack-on-titan-wiki-api.vercel.app/titans/1,2
```

### Titanları Filtrele

Kullanılabilir parametreler:
- **name**: İsme göre filtrele
- **allegiance**: Bağlılığına göre filtrele

```
GET http://attack-on-titan-wiki-api.vercel.app/titans?allegiance=Eldia
```