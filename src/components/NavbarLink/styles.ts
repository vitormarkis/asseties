import { AutoAwesome, Home as HomeSVG, LibraryBooks } from "@assets/icons"
import styled, { css } from "styled-components"

const iconsCSS = css({
  width: "27px",
  height: "27px",
})

export const Asset = styled(AutoAwesome)`
  ${iconsCSS}
`
export const Home = styled(HomeSVG)`
  ${iconsCSS}
  width: "40px";
  height: "40px";
`
export const TagsLibrary = styled(LibraryBooks)`
  ${iconsCSS}
`
