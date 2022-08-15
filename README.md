Firebase hook lib for firebase v9

### DO NOT USE ###
This library was made just for educational purpose

In the main app use the initial config hook 

import {useInitializeFirebase} from 'firebase-hook-v9'

const App = () => {
   useInitializeFirebase({
    apiKey: "apikey",
    authDomain: "domain",
    projectId: "project name",
  })
 return <div>
 
 </div>

}