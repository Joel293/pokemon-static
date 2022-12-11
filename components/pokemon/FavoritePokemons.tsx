import { FC } from 'react';
import { Grid } from '@nextui-org/react';
import { FavoritePokemonCard } from './'; //apunta la index.ts


interface Props{
    pokemons: number[]
}

export const FavoritePokemons: FC<Props> = ({pokemons}) => {
    return (
        <Grid.Container gap={2} direction='row' justify='flex-start'>
            {
                pokemons.map( id => (
                   <FavoritePokemonCard pokemonId={id} key={id}/>
                ))
            }
        </Grid.Container>
    )
}

