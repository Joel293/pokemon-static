import { FC, useEffect, useState } from 'react';

import { Layout } from '../../components/layouts';
import { NoFavorites } from '../../components/ui';
import { FavoritePokemons } from '../../components/pokemon';
import { localFavorites } from '../../utils';

const FavoritesPage: FC = () => {

    const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setfavoritePokemons( localFavorites.pokemons );
    }, []);
    

    return (
        <Layout title='Pokemon - Favoritos'>
            {
                favoritePokemons.length === 0
                ? ( <NoFavorites /> )
                : ( <FavoritePokemons pokemons={favoritePokemons}/> )
            }
        </Layout>
    )
}


export default FavoritesPage;