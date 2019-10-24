import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

export class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            isLoaded: false,
            pop_open: false
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            pop_open: !this.state.pop_open,
            anchorEl: e.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            pop_open: false,
        });
    };

    componentDidMount() {
        const url = "https://api.themoviedb.org/3/movie/popular?api_key=60249961fe048e2303317aa3a5696c8f&language=en-US&page=1";
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    movies: json.results
                })
            });
    }

    render() {
        let {isLoaded, movies} = this.state;
        console.log(movies);

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
                                onRequestClose={this.handleRequestClose.bind(this)}
                            >
                                <Card className="detail-card" key={movie.id}>
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