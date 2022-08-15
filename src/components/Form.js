import { TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'



const Form = ({setUserInfo , setForkedRepos, setMostActiveRepos, setLoadingBuffer})  => {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState('')
    const search = () => {
        setUser(username)
    }
    

    useEffect(() => {
        if(user){
            setLoadingBuffer(true)
            const token = process.env.REACT_APP_GITHUB_TOKEN
            const uri_1 = process.env.REACT_APP_GET_USER_API_URI + user
            const uri_2 = uri_1 + "/repos"
            const headers = {
                "Authorization": "token "+ token,
                "Accept":"application/vnd.github+json"
            }

            axios.all([
                axios.get(uri_1, {
                "headers":headers
                }),
                axios.get(uri_2, {
                    "headers":headers
                })
            ])
            .then(axios.spread((...res)=>{
                setUserInfo(res[0].data)

                const forkedRepos = res[1].data.filter(item => item.fork === true)
                const mostActiveRepos = res[1].data.filter((item) =>{
                    let lastUpdatedAt = new Date(item.updated_at)
                    let difference = new Date() - lastUpdatedAt.getTime() 
                    let totalDays = Math.ceil(difference/(1000 * 3600 * 24))
                    if(totalDays <= 30){
                        return item
                    }
                })
                setMostActiveRepos(mostActiveRepos)
                setForkedRepos(forkedRepos)
                setLoadingBuffer(false)
            }))

            .catch( err => {
                console.log("NotFound")
                setLoadingBuffer(false)
            })

        }

    }, [user])

    return (
    <div>
        <div className='App-header'>
            <div>
                <TextField
                    id="filled-basic" 
                    label="Filled" 
                    variant="filled" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                
            </div>
            <div className='Form-button'>
                <Button variant="contained" onClick={search}>Search</Button>
            </div>
            
        </div>
       

    </ div>
  )
}

export default Form ;  