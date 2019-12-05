import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import { POP_MOVIE_URL } from '../constants';

class Main extends React.Component {
    state = {
        movies: [],
        isLoaded: false,
        pop_open: false
    }

    componentDidMount() {
        fetch(POP_MOVIE_URL)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    movies: json.results
                })
            });
    }

    handleClick = e => {
        e.preventDefault();
        this.setState({
            pop_open: true,
            anchorEl: e.currentTarget,
        });
    }

    handleRequestClose = () => {
        this.setState({
            pop_open: false,
        });
    };

    render() {
        let {isLoaded, movies} = this.state;

        if (!isLoaded) {
            return <div>Loading...</div>
        }

        if (!this.state.movies) {
            return <div>Fail to load the list of movies</div>
        }

        return (
            <div className="main">
                {movies.map(movie => (
                    <Card className="movie-card" key={movie.id}>
                        <img
                            className="movie-img"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            alt={`Pic of ${movie.title}`}
                        />
                        <CardContent>
                            <Typography className="movie-title" gutterBottom variant="h5" component="h2">
                                {movie.title}
                            </Typography>
                            <Typography className="movie-release" variant="body2" color="textSecondary" component="p">
                                (Release: {movie.release_date})
                            </Typography>
                        </CardContent>
                        <CardActions className="movie-btn">
                            <Button size="small" color="primary" type="submit" name={this.state.name}
                                    onClick={this.handleClick.bind(this)}>
                                See Detail
                            </Button>

                            <Popover
                                open={this.state.pop_open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
                                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                            >

                                <Card className="detail-card">
                                    <img
                                        className="movie-img"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        title={movie.title}
                                        alt={`Pic of ${movie.title}`}
                                    />
                                    <CardContent>
                                        <Typography className="detail-title" gutterBottom variant="h5" component="h2">
                                            {movie.title}
                                        </Typography>
                                        <Typography className="detail-movie">
                                            Overview: {movie.overview}
                                        </Typography>
                                        <br/>
                                        <Typography className="detail-popularity">
                                            Popularity: {movie.popularity}
                                        </Typography>
                                        <Typography className="detail-votercount">
                                            Voter Count: {movie.vote_count}
                                        </Typography>
                                        <Button size="small" color="primary" type="submit" className="detail-btn"
                                                onClick={this.handleRequestClose.bind(this)}>
                                            Close
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Popover>
                        </CardActions>
                    </Card>
                ))}
            </div>
        );
    }
}

export default Main;
