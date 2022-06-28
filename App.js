import { StyleSheet, Text, View, FlatList, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import axios, { Axios } from 'axios';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { TouchableOpacity } from 'react-native-web';






export default function App() {

  const [test, setTest] = useState([]);
  const [ilceListe, setIlceListe] = useState([]);


  //il dropdown değişkenleri
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Adana', value: 'adana' },
    { label: 'Adıyaman', value: 'adiyaman' },
    { label: 'Afyonkarahisar', value: 'afyonkarahisar' },
    { label: 'Ağrı', value: 'agri' },
    { label: 'Aksaray', value: 'aksaray' },
    { label: 'Amasya', value: 'amasya' },
    { label: 'Ankara', value: 'ankara' },
    { label: 'Antalya', value: 'antalya' },
    { label: 'Ardahan', value: 'ardahan' },
    { label: 'Artvin', value: 'artvin' },
    { label: 'Balıkesir', value: 'balikesir' },
    { label: 'Bartın', value: 'bartin' },
    { label: 'Batman', value: 'batman' },
    { label: 'Bayburt', value: 'bayburt' },
    { label: 'Bilecik', value: 'bilecik' },
    { label: 'Bingöl', value: 'bingol' },
    { label: 'Bitlis', value: 'bitlis' },
    { label: 'Bolu', value: 'bolu' },
    { label: 'Çanakkale', value: 'canakkale' },
    { label: 'Çankırı', value: 'cankiri' },
    { label: 'Çorum', value: 'corum' },
    { label: 'Denizli', value: 'denizli' },
    { label: 'Diyarbakır', value: 'diyarbakir' },
    { label: 'Düzce', value: 'duzce' },
    { label: 'Edirne', value: 'edirne' },
    { label: 'Elazığ', value: 'elazig' },
    { label: 'Erzincan', value: 'erzincan' },
    { label: 'Erzurum', value: 'erzurum' },
    { label: 'Eskişehir', value: 'eskisehir' },
    { label: 'Gaziantep', value: 'gaziantep' },
    { label: 'Giresun', value: 'giresun' },
    { label: 'Gümüşhane', value: 'gumushane' },
    { label: 'Hakkari', value: 'hakkari' },
    { label: 'Hatay', value: 'hatay' },
    { label: 'Iğdır', value: 'igdir' },
    { label: 'Isparta', value: 'isparta' },
    { label: 'İstanbul', value: 'istanbul' },
    { label: 'İzmir', value: 'izmir' },
    { label: 'Kahramanmaraş', value: 'kahramanmaras' },
    { label: 'Karabük', value: 'karabuk' },
    { label: 'Karaman', value: 'karaman' },
    { label: 'Kars', value: 'kars' },
    { label: 'Kastamonu', value: 'kastamonu' },
    { label: 'Kayseri', value: 'kayseri' },
    { label: 'Kilis', value: 'kilis' },
    { label: 'Kırıkkale', value: 'kirikkale' },
    { label: 'Kırklareli', value: 'kirklareli' },
    { label: 'Kırşehir', value: 'kirsehir' },
    { label: 'Kocaeli', value: 'kocaeli' },
    { label: 'Kütahya', value: 'kutahya' },
    { label: 'Malatya', value: 'malatya' },
    { label: 'Manisa', value: 'manisa' },
    { label: 'Mardin', value: 'mardin' },
    { label: 'Mersin', value: 'mersin' },
    { label: 'Muğla', value: 'mugla' },
    { label: 'Muş', value: 'mus' },
    { label: 'Nevşehir', value: 'nevsehir' },
    { label: 'Niğde', value: 'nigde' },
    { label: 'Ordu', value: 'ordu' },
    { label: 'Osmaniye', value: 'osmaniye' },
    { label: 'Rize', value: 'rize' },
    { label: 'Sakarya', value: 'sakarya' },
    { label: 'Samsun', value: 'samsun' },
    { label: 'Şanlıurfa', value: 'sanliurfa' },
    { label: 'Siirt', value: 'siirt' },
    { label: 'Sinop', value: 'sinop' },
    { label: 'Sivas', value: 'sivas' },
    { label: 'Şırnak', value: 'sirnak' },
    { label: 'Tekirdağ', value: 'tekirdag' },
    { label: 'Tokat', value: 'tokat' },
    { label: 'Trabzon', value: 'trabzon' },
    { label: 'Tunceli', value: 'tunceli' },
    { label: 'Uşak', value: 'usak' },
    { label: 'Van', value: 'van' },
    { label: 'Yalova', value: 'yalova' },
    { label: 'Yozgat', value: 'yozgat' },
    { label: 'Zonguldak', value: 'zonguldak' }
  ]);






  //eczane listesi
  const [eczaneListe, setEczaneListe] = useState([]);


  // ilce dropdown değişkenleri

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  var [disabled2, setDisabled2] = useState(true);

  const [items2, setItems2] = useState([]);



  //

  let
    showListItemTemp = [];
  //API İŞLEMLER

  const fetchilcedata = (itemCity) => {
    fetch('https://www.nosyapi.com/apiv2/pharmacy/city?city=' + itemCity + '&apikey=kJkEYbnf8aoAYB470O8FYiIeWaKayeMpq9m8zldHcbiIhMl0LQvuKXno7zTa')
      .then((response) => response.json())
      .then(
        (json) => setIlceListe(json.data)
      )
      .catch((error) => console.error(error))
  };



  //Eczane Listeleme
  const fetcheczanedata = (cityName, countyName) => {
    axios.get('https://www.nosyapi.com/apiv2/pharmacyLink?city=' + cityName + '&county=' + countyName + '&apikey=kJkEYbnf8aoAYB470O8FYiIeWaKayeMpq9m8zldHcbiIhMl0LQvuKXno7zTa')
      .then(res => {
        setEczaneListe(res.data)
        console.log(res.data)

      })
  };



  //ilce dropdown veri düzenleme
  const dataEdit = () => {

    ilceListe.map((item,
      index) => {

      const
        temp = {
          label:
            item.ilceAd,
          value:
            item.ilceSlug,
        };
      showListItemTemp.push(temp);
    });

    setItems2(showListItemTemp);
  }















  return (
    <View style={styles.container}>


      <View style={styles.chooseArea}>


        <Text style={styles.titleText}>Nöbetçi Eczaneler</Text>
        <View style={styles.cityArea}>
          <DropDownPicker style={styles.cityPicker} containerStyle={{}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Lütfen il seçiniz"
            onChangeValue={(value) => {


            }}

            onSelectItem={(item) => {

              setDisabled2(false);
              fetchilcedata(item.value);
              dataEdit();
            }}
          />
        </View>

        <View style={styles.cityArea}>

          <DropDownPicker style={styles.cityPicker} containerStyle={{}}
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="Lütfen ilçe seçiniz"
            onPress={
              dataEdit
            }
            onChangeValue={(value) => {
            }}
            onSelectItem={(item) => {
              const tempCity = value;



              fetcheczanedata(tempCity, item.value);



            }}
          />




        </View>



      </View>

      <View style={styles.showArea}>

        {eczaneListe.length == 0 ? <View style={styles.bosView}>
          <Image

            source={require('./assets/eczane.png')}
          />
        </View>
          :
          <FlatList data={eczaneListe.data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => {
              var latitudeMap = item.latitude
              var longitudeMap = item.longitude
              var phoneNumber = item.Telefon


              return <View style={styles.eczaneAlani}>

                <View style={styles.eczaneAdiAlani}>
                  <Text style={styles.eczaneAdi}>{item.EczaneAdi}</Text>
                </View>

                <View style={styles.eczaneAdresiAlani}>
                  <Text style={styles.eczaneAdresi}>{item.Adresi}</Text>
                </View>

                <View style={styles.eczaneAdresiAlani}>
                  <Text onPress={() => Linking.openURL(`tel:${phoneNumber}`)} style={styles.eczaneTelefon}>{item.Telefon}</Text>
                </View>

                <View style={styles.eczaneKonumuAlani}>
                  <MapView
                    onPress={(e) => {
                      Linking.openURL('https://www.google.com/maps/dir//' + latitudeMap + ',' + longitudeMap);
                    }}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                      latitude: latitudeMap,
                      longitude: longitudeMap,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}>
                    <Marker coordinate={{
                      latitude: latitudeMap,
                      longitude: longitudeMap,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }} />
                  </MapView>
                </View>

              </View>
            }}
          />}





      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',

  },
  chooseArea: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: "visible",
    zIndex: 500,

  },
  showArea: {
    backgroundColor: '#c4161c',
    flex: 2,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    overflow: "visible",
    zIndex: 0,
  },
  titleText: {
    fontSize: 32,
    marginVertical: 15,
    color: '#000'
  },

  cityArea: {
    marginHorizontal: 50,
    overflow: "visible"
  },
  cityPicker: {
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    zIndex: 1000,

  },



  eczaneAlani: {

    flexDirection: 'column',
    marginHorizontal: 30,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    zIndex: 1,

  },

  eczaneAdi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  eczaneAdresi: {
    fontSize: 20,
    fontWeight: '300',
    marginBottom: 15,

  },
  eczaneTelefon: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,

  },
  eczaneKonumuAlani: {

    backgroundColor: 'black',
    height: 200,

  },

  map: {
    height: 200,

  },

  bosView: {
    justifyContent: 'center',
    alignItems: 'center',

  }


});
