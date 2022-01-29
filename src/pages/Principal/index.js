import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ViewActivity,
  CategoriaView,
  BannerView,
  ViewPrincipal,
  ViewRestaurantes,
  TituloRestaurantes,
  ButtonTipoSelect,
  TextTipoSelect,
  SelectTipo
} from './style';
import { Text, Alert, ActivityIndicator } from 'react-native';

export default function Principal({ navigation }) {

  const [banners, setBanner] = useState();
  const [categorias, setCategorias] = useState();
  const [restaurantes, setRestaurantes] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function buscaDados() {

      try {

        const response = await fetch('http://my-json-server.typicode.com/pablohdev/app-ifood-clone/db');

        const data = await response.json();

        setLoaded(true);
        setBanner(data.banner_principal);
        setCategorias(data.categorias);
        setRestaurantes(data.restaurantes);

      } catch (e) {
        Alert.alert('Erro ao consultar: ' + e);
      }

    }

    buscaDados();

  });

  const ViewHome = (props) => {
    return (
      <Text>Principal</Text>
    );
  }

  return (
    <>
      <StatusBar style="theme-dark" />
      <SafeAreaView>
        {
          loaded ? (
            <ViewHome />
          ) : (
            <ViewActivity >
              <ActivityIndicator color="#F0001A" size="large" />
              <Text>Carregando dados aguarde...{loaded}</Text>
            </ViewActivity>
          )
        }
      </SafeAreaView>
    </>
  );
}