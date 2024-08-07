import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance.js';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPageState, modeState } from '@/recoil.js';
import { motion } from 'framer-motion';
import { MdDeveloperBoard } from 'react-icons/md';
import { MdDeveloperBoardOff } from 'react-icons/md';
import { IoHome } from 'react-icons/io5';
import { GoProjectRoadmap } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { PiStudentBold } from 'react-icons/pi';
const Dot = ({ onMenuClick }) => {
    const [menuData, setMenuData] = useState([]);
    const currentPage = useRecoilValue(currentPageState);
    const [mode, setMode] = useRecoilState(modeState);

    const componentsMap = {
        Profile: Profile,
        Career: Career,
        Home: Home,
        Education: mode !== 'dev' ? Education : null,
    };

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axiosInstance
                    .get('/api/menu/public')
                    .then(function (data) {
                        return data;
                    });
                setMenuData(response.data.menus);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };
        fetchMenuData();
    }, []);

    const dotButtons = () => {
        return menuData.map((item) => {
            const DynamicComponent = componentsMap[item.menuName];
            return (
                <React.Fragment key={item.menuSeq}>
                    {currentPage === item.menuSeq ? (
                        <Dots
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1.6 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                ease: [0, 0.71, 0.2, 1.01],
                                repeat: Infinity,
                            }}
                            $num={item.menuSeq}
                            $currentPage={currentPage}
                        >
                            {DynamicComponent && <DynamicComponent />}
                        </Dots>
                    ) : (
                        <ClickableDots
                            onClick={() => onMenuClick(item.menuSeq)}
                            $num={item.menuSeq}
                            $currentPage={currentPage}
                        >
                            {DynamicComponent && <DynamicComponent />}
                        </ClickableDots>
                    )}
                    <MenuButton $num={item.menuSeq} $currentPage={currentPage}>
                        {item.menuName}
                    </MenuButton>
                </React.Fragment>
            );
        });
    };

    const modeChange = () => {
        if (mode === 'dev') {
            setMode('basic');
        } else {
            setMode('dev');
        }
    };

    return (
        <>
            <DotContainer>
                <DotBox>
                    <IconBox
                        nitial={{ y: 0 }} // 초기 위치
                        animate={{ y: [0, -8, 0] }} // 움직임 설정
                        transition={{ duration: 1, repeat: Infinity }}
                    ></IconBox>
                    {dotButtons()}
                </DotBox>
            </DotContainer>
            <ModeDotContainer>
                <ModeTitle
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: [0, 0.71, 0.2, 1.01],
                        repeat: Infinity,
                    }}
                >
                    change mode
                </ModeTitle>
                <ModeDots
                    onClick={() => {
                        modeChange();
                    }}
                >
                    {mode !== 'dev' ? <DevMode /> : <BasicMode />}
                </ModeDots>
                <MenuButton>{mode !== 'dev' ? 'dev' : 'basic'}</MenuButton>
            </ModeDotContainer>
        </>
    );
};

export default Dot;

const DotContainer = styled.div`
    position: fixed;
    top: 34%;
    right: 3%;
    width: 10%;
    z-index: 20;
    @media screen and (max-width: 768px) {
        width: 100%;
        top: 0;
        right: 28%;
    }
`;

const MenuButton = styled.span`
    display: ${({ $currentPage, $num }) =>
            $currentPage === $num ? 'block' : 'none'};
    align-items: center;
    background-color: transparent;
    color: white;
    border: none;
    font-size: ${({ theme }) => theme.fonts.mainFontSize};
    text-shadow: 8px 8px 4px rgba(230, 27, 57, 0.8);
    transform: translateY(
            ${({ $currentPage, $num }) => ($currentPage === $num ? '0' : '20px')}
    );
    transition:
            opacity 0.5s ease,
            transform 0.5s ease;
    @media screen and (max-width: 768px) {
        font-size: ${({ theme }) => theme.fonts.mobile.mainFontSize};
        margin-top: 8%;
    }
`;

const DotBox = styled.div`
    display: flex;
    float: right;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    width: 50%;
    @media screen and (max-width: 768px) {
        flex-direction: unset;
    }
`;

const Dots = styled(motion.div)`
    width: 30px;
    height: 30px;
    margin-top: 30%;
    margin-bottom: 30%;
    color: ${({ $currentPage, $num }) =>
            $currentPage === $num ? 'rgba(230, 27, 57, 1)' : 'white'};
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
    @media screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-top: 8%;
        margin-bottom: 0;
    }
`;
const IconBox = styled(motion.div)``;

const ClickableDots = styled(Dots)`
    pointer-events: auto; /* 클릭 이벤트 활성화 */
`;

const iconStyle = `
    width: 100%;
    height: 100%;
`;

const Profile = styled(CgProfile)`
    ${iconStyle}
`;

const Education = styled(PiStudentBold)`
    ${iconStyle}
`;

const Career = styled(GoProjectRoadmap)`
    ${iconStyle}
`;
const Home = styled(IoHome)`
    ${iconStyle}
`;

const DevMode = styled(MdDeveloperBoard)`
    ${iconStyle}
`;

const BasicMode = styled(MdDeveloperBoardOff)`
    ${iconStyle}
`;

const ModeDotContainer = styled.div`
    position: fixed;
    top: 42%;
    left: 1%;
    display: flex;
    flex-wrap: wrap;
    width: 6%;
    z-index: 20;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        width: 100%;
        top: 0;
        left: 10%;
    }
`;
const ModeDots = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 30px;
    margin-bottom: 4%;
    color: ${({ $currentPage, $num }) =>
            $currentPage === $num ? 'rgba(230, 27, 57, 1)' : 'white'};
    &:hover {
        cursor: pointer;
        transform: scale(1.5);
    }
    @media screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
        margin-top: 8%;
        margin-bottom: 0;
    }
`;

const ModeTitle = styled(motion.div)`
    white-space: nowrap; // 줄바꿈 방지
    color: white;
    margin-bottom: 10%;
`;
