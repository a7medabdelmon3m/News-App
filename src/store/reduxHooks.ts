import { useSelector } from './../../node_modules/react-redux/src/hooks/useSelector';
import { TypedUseSelectorHook } from './../../node_modules/react-redux/src/types';
import { useDispatch } from './../../node_modules/react-redux/src/hooks/useDispatch';
import { appDispatch, RootState } from './store';
export const useAppDispatch = () => useDispatch<appDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;