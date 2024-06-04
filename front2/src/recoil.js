import { atom, useRecoilState } from 'recoil';

// currentPage 상태를 위한 atom 정의
export const currentPageState = atom({
    key: 'currentPageState', // 상태를 식별하는 고유 키
    default: 1, // 초기값 설정
});

export const userState = atom({
    key: 'userState',
    default: null,
});

export const profileState = atom({
    key: 'profileState',
    default: {},
});

export const stackState = atom({
    key: 'stackState',
    default: [],
});

export const careerState = atom({
    key: 'careerState',
    default: null,
});

export const educationState = atom({
    key: 'educationState',
    default: null,
});
