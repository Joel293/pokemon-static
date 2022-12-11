import { NextPage, GetStaticProps } from 'next';
import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';

import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

    return (
      <Layout
        title='Listado de Pókemons'
      >
      
        <Grid.Container gap={2}  justify='flex-start'>
          { pokemons.map(( pokemon ) => (
              <PokemonCard
                key={pokemon.id} 
                pokemon={ pokemon }
              />
          ))}

        </Grid.Container>
      </Layout>
    )
}

//se ejecuta unicamente del lado del servidor, y se ejecuta durante el build de la app
//solo se puede usar en pages, cuando estamos en modo desarrollo se puede llamar las veces que queramos
//cuando estamos en produccion solo se ejecuta 1 sola vex
//debemos usarla cuando sepamos cuantos elementos preinstertados hay, no para hacer peticiones extra al cliente
//si tenemos 151 pokemon, entonces esos 151 se mostrarán
export const getStaticProps: GetStaticProps = async (ctx) => {

  // console.log('Hola mundo');
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151', {
    headers: {
      'accept-encoding': '*'
    }
  });

    //las interfaces solo sirven para ayudarnos a que un objeto luzca de cierta manera, que tengan estas propiedades, metodos

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
