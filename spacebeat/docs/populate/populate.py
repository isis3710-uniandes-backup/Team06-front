import json
import csv
import requests

class Populate:

    def __init__(self):
        print("Starting files writting")     

    def readfile(self):
        print('xd') 

    def writeFile(self, regular):
        token = "BQDc1Uq2UHElkSXT2MRn7wbLlFRRZnxCh9cOtobkMNymqKs-uziTBSkoXSRj2LKJhJ5F8LNkMTwrlkzFqHakYgEjUocjTKef63GbnNnJ6XFYk4VMbnT6LPpmTI92sVYGr-hYcqFLC0FHCBk"
        print("Writting " + regular)
        endpoint = "https://api.spotify.com/v1/search?q="+regular+"&type=artist&limit=50&access_token="+token

        r = requests.get(url = endpoint)
        data = r.json()['artists']['items']

        songfile = open('./songs.csv', 'a', newline='')
        artistfile = open('./artists.csv', 'a', newline='')
        albumfile = open('./albums.csv', 'a', newline='')
        songfilewriter = csv.writer(songfile) 
        artistfilewriter = csv.writer(artistfile)
        albumfilewriter = csv.writer(albumfile)

        for datartist in data:

            endpoint = 'https://api.spotify.com/v1/search?q=artist:"'+datartist['name']+'"&type=album&limit=10&access_token='+token
            r = requests.get(url = endpoint)
            dataalbums = r.json()['albums']['items']

            for edataalbum in dataalbums:

                epalbum = "https://api.spotify.com/v1/albums/"+edataalbum['id']+"?access_token="+token
                ralbum = requests.get(url = epalbum)
                datalbum = ralbum.json()
                datasongs = datalbum['tracks']['items']

                for dat in datasongs:

                    try:                    
                        artist = {"artist_name": datartist['name'], "artist_genre":datartist['genres'][0], "artist_likes": 0, "artist_image": datartist['images'][0]['url'], "artist_identifier": datartist['id']}
                        song = {"song_name":dat['name'], "song_duration":dat['duration_ms'], "song_likes": 0, "song_identifier":dat['id'], "AlbumId": edataalbum['id']}
                        album = {"album_name":edataalbum['name'], "album_likes": 0, "album_releasedate":edataalbum['release_date'], "album_image":edataalbum['images'][0]['url'], "album_identifier": edataalbum['id'], "ArtistId": datartist['id']}
                        albumfilewriter.writerow(album.values())
                        artistfilewriter.writerow(artist.values())
                        songfilewriter.writerow(song.values())
                        print('Data set added correctly in group '+regular)
                    except:
                        print('Data set couldnt be added in group '+regular)


        songfile.close()
        albumfile.close()
        artistfile.close()

letters = ['w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

populate = Populate()

for letter in letters:
    populate.writeFile(letter)