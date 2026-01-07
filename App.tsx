
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import { authCheck } from './redux/authCreator';
import Header from './components/Layout/Header';
import BurgerPage from './pages/BurgerPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import Logout from './pages/Logout';
import { RootState } from './types';

const AppContent: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    {token ? (
                        <>
                            <Route path="/" element={<BurgerPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    )}
                </Routes>
            </main>
            <footer className="py-6 text-center text-slate-400 text-sm border-t border-slate-100 bg-white">
                © {new Date().getFullYear()} BurgerBuilder Pro. Built for performance.
            </footer>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <AppContent />
            </HashRouter>
        </Provider>
    );
};

export default App;
