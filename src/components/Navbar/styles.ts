import { Home as HomeSVG, LibraryBooks } from "@assets/icons"
import chroma from "chroma-js"
import styled, { css } from "styled-components"
import tail from "tailwindcss/colors"

const iconsCSS = css({
  flexShrink: 0,
  width: "32px",
  height: "32px",
})

export const Home = styled(HomeSVG)`
  ${iconsCSS}
`
export const TagsLibrary = styled(LibraryBooks)`
  ${iconsCSS}
  width: 27px;
  margin-left: -5px;
`

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.isClosed {
    p {
      display: none;
    }
  }

  a {
    display: flex;
    flex-direction: row;
    &:not(.active):hover {
      /* svg {
        fill: ${tail.violet["900"]};
      }

      p {
        color: ${tail.violet["900"]};
      } */
      box-shadow: 0 3px 2px ${`${chroma(tail.gray["700"]).alpha(0.07)}`},
        inset 0 1px 2px ${`${chroma(tail.gray["700"]).alpha(0.07)}`};
    }
  }

  svg {
    fill: ${tail.gray["700"]};
  }

  p {
    font-size: 1rem;
    color: ${tail.gray["700"]};
  }

  & .active {
    background-color: #e5e7eb;

    svg {
      fill: ${tail.violet["700"]};
    }

    p {
      color: ${tail.violet["700"]};
    }
  }

  @media (max-width: 760px) {


    p {
        display: none;
    }
  }

  @media (max-width: 560px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }

`
