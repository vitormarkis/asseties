import styled, { css } from 'styled-components';
import { Home as HomeSVG, LibraryBooks } from '@assets/icons'

const iconsCSS = css({
    width: '32px',
    height: '32px',
})

export const Home = styled(HomeSVG)`${iconsCSS}`;
export const TagsLibrary = styled(LibraryBooks)`${iconsCSS}
    width: 27px;
    margin-left: 2px;
`;
