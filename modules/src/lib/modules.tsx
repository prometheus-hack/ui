import styled from 'tailwind';

/* eslint-disable-next-line */
export interface ModulesProps {}

const StyledModules = styled.div`
  color: pink;
`;

export function Modules(props: ModulesProps) {
  return (
    <StyledModules>
      <h1>Welcome to Modules!</h1>
    </StyledModules>
  );
}

export default Modules;
