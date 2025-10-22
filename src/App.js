import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery";
import MainComponent from "./Components/MainComponent";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <MainComponent />
            </div>
        </Provider>
    );
}

export default App;
