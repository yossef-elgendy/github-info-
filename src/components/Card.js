import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import '../App.css';
import { Fragment } from 'react';

const CardContainer = ({userInfo, forkedRepos, mostActiveRepos}) => {

    const renderForkedRepos = forkedRepos.map((item, index) => {
        let repo_name = item.html_url.split('/')[item.html_url.split('/').length -1]
        return(
            <ListItem className="list-item" key={index} component="div" disablePadding>
                <ListItemButton href={item.html_url}>
                    {repo_name}
                </ListItemButton>
            </ListItem>
        )
  
    })

    const renderMostActiveRepos = mostActiveRepos.map((item, index) => {
        let repo_name = item.html_url.split('/')[item.html_url.split('/').length -1]
        return(
            <ListItem className="list-item" key={index} component="div" disablePadding>
                <ListItemButton href={item.html_url}>
                    {repo_name}
                </ListItemButton>
            </ListItem>
        )
  
    })
    console.log(forkedRepos)
    
    const renderUserInfo = ( 
    <Fragment> 
        <ListItem className="list-item" key={0} component="div" disablePadding>
            <ListItemButton >
                Repos: {userInfo.public_repos}
            </ListItemButton>
        </ListItem>
        <ListItem className="list-item" key={1} component="div" disablePadding>
            <ListItemButton >
                Followers: {userInfo.followers}
            </ListItemButton>
        </ListItem>

        <ListItem className="list-item" key={2} component="div" disablePadding>
            <ListItemButton >
                Followers: {userInfo.following}
            </ListItemButton>
        </ListItem>


        <ListItem className="list-item" key={3} component="div" disablePadding>
            <ListItemButton >
                Location:&nbsp;{userInfo.location || (<span> No Location </span>)}
            </ListItemButton>
        </ListItem>

    </Fragment>
    )

    return (
        <Card sx={{ maxWidth: 345 , justifyContent: "center", marginBottom:10 }}>
            <CardMedia
                component="img"
                alt={userInfo.name}
                height="350"
                image={userInfo.avatar_url}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {userInfo.login} {userInfo.name && ": " + userInfo.name}
                </Typography>
                <Typography variant="div" color="text.secondary">
                    <List >
                        {renderUserInfo}
                    </List>
                </Typography>

                <Typography  style={{marginTop:50}} gutterBottom variant="h5" component="div">
                    Forked Repos
                </Typography>
                <Typography variant="div" color="text.secondary">
                    <List >
                        {renderForkedRepos.length > 0 ?
                            renderForkedRepos: (
                            <ListItem key={0} component="div" disablePadding>
                                <ListItemButton >
                                    NO Forked Repos
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Typography>

                <Typography  style={{marginTop:50}} gutterBottom variant="h5" component="div">
                    Most Active Repos
                </Typography>

                <Typography variant="div" color="text.secondary">
                    <List >
                        {renderMostActiveRepos.length > 0 ? 
                            renderMostActiveRepos:(
                            <ListItem key={0} component="div" disablePadding>
                                <ListItemButton >
                                    N Active Repos
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={userInfo.html_url} size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}



export default CardContainer 
