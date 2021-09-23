import { lazy, Suspense, useEffect } from 'react';
/// Components
import Index from './jsx/index';
import { connect, useDispatch } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";




const Booking = lazy(() => {
    return new Promise(resolve => {
		setTimeout(() => resolve(import('./jsx/booking/Booking')), 500);
	});
});
function App (props) {
    localStorage.setItem('userDetails', JSON.stringify({"kind":"identitytoolkit#VerifyPasswordResponse","localId":"qmt6dRyipIad8UCc0QpMV2MENSy1","email":"demo@example.com","displayName":"","idToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlNTJiOGQ4NTk4N2U1OWRjYWM2MmJlNzg2YzcwZTAyMDcxN2I0MTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtY291cnNlLWI3OThlIiwiYXVkIjoicmVhY3QtY291cnNlLWI3OThlIiwiYXV0aF90aW1lIjoxNjMyMjk0Mjc3LCJ1c2VyX2lkIjoicW10NmRSeWlwSWFkOFVDYzBRcE1WMk1FTlN5MSIsInN1YiI6InFtdDZkUnlpcElhZDhVQ2MwUXBNVjJNRU5TeTEiLCJpYXQiOjE2MzIyOTQyNzcsImV4cCI6MTYzMjI5Nzg3NywiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlbW9AZXhhbXBsZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.DPlBotlVpW0bHrE4OG2yYmKAkS4C5UXi329rCodZeYeoE3j4FkRReKGbwrwJQTADQ58TUjze1baAh73LSBvLbuiaAwxHo3kGC3cYT_6E0PY27D_5Q-9yzlJUjo7Bddfb3SwruCCZf6X8MyGOekFr8KNWrb4Dp2ddEgAFoN6Gn7yKTFta-GAbmrzSkR1c1n_OPi7e-bHdWi9EXuNel9Ek0UBsNaBKHYXk8TIXyiHtzyMFHdUrlFQx2s63SB4ECqceBTWFYO_jDQ4jvE3LFwV8EbA5OsgjVbpHAoKZXFA7SWa-KwrFjbtWcOX7NU2oF3LPC6Q1lMUMS58fCJvLgaaOnw","registered":true,"refreshToken":"ACzBnCh8wRPix_WmserHdZbp1ohnA7WLuwkY2dQVgqAfDVstkbOmOY-mYBZn2G8TMKCYUAf-JtTM2ZL-0zhpr4vOEwmvdhUdxZH9useRus5Eqg25df7Ler-QVbSDiFXiRfa8zugHKVPuOGS-rPgivNJI41N8DVcOyNZl0NQ7NaMGMQHnp4AYEQTz9NbSvUMnHWwozzXQ6F-c36jeAw9gfFD6_2mUJWaNQA","expiresIn":"3600","expireDate":"2022-09-26T11:04:38.555Z"}));
    const dispatch = useDispatch();
    useEffect(() => {
        checkAutoLogin(dispatch, props.history);
    }, [dispatch, props.history]);
    
    let routes = (  
        <Switch>
            <Route path='/' component={Booking} />
        </Switch>
    );
    if (props.isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index />
                </Suspense>
            </>
        );
	
	}else{
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 
