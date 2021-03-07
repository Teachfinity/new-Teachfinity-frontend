import React from "react"
import ContentLoader from "react-content-loader"


export const UpworkJobLoader = props => {
  return (
    <ContentLoader viewBox="0 0 778 116" width={778} height={116} {...props}>
      <rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
      <rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
      <rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
      <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
      <rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
    </ContentLoader>
  )
}

UpworkJobLoader.metadata = {
  name: 'Ahsan Ullah', // My name
  github: 'IamAhsanMani', // Github username
  description: 'Upwork Job',
  filename: 'UpworkJobLoader',
}


export const NetflixLoader = props => {
  // Get values from props
  // const { rows, columns, coverHeight, coverWidth, padding, speed } = props;

  // Hardcoded values
  const rows = 2
  const columns = 7
  const coverHeight = 245
  const coverWidth = 245
  const padding = 5
  const speed = 1

  const coverHeightWithPadding = coverHeight + padding
  const coverWidthWithPadding = coverWidth + padding
  const initial = 35
  const covers = Array(columns * rows).fill(1)

  return (
    <ContentLoader
      speed={3}
      width={columns * coverWidthWithPadding}
      height={rows * coverHeightWithPadding}
      primaryColor="#6ab3d2a9"
      secondaryColor="#e8e8e8"
      backgroundColor="#e8e8e8"
      foregroundColor="#279ea598"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx="0"
        ry="0"
        width={columns * coverWidthWithPadding - padding}
        height="20"
      />

      {covers.map((g, i) => {
        let vy = Math.floor(i / columns) * coverHeightWithPadding + initial
        let vx = (i * coverWidthWithPadding) % (columns * coverWidthWithPadding)
        return (
          <rect
            key={i}
            x={vx}
            y={vy}
            rx="0"
            ry="0"
            width={coverWidth}
            height={coverHeight}
          />
        )
      })}
    </ContentLoader>
  )
}

NetflixLoader.metadata = {
  name: 'Pratik Pathak',
  github: 'PathakPratik',
  description: 'Netflix Style Dynamic',
  filename: 'Netflix',
}

export const ThreeDots = props => (
  <ContentLoader
    speed={1}
    viewBox="0 0 400 160"
    height={120}
    width={500}
    backgroundColor="#3aa5ab"
    foregroundColor="#e8e8e8"
    {...props}
  > 
    
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
)

ThreeDots.metadata = {
  name: 'RioF',
  github: 'clariokids',
  description: 'Three Dots',
  filename: 'ThreeDots',
}

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#6ab3d2a9"
    foregroundColor="#e8e8e8"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
)

export default MyLoader
