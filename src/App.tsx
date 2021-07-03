import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: block;
`;

function App() {
  return (
    <Wrapper>
      <div className="tw-m-auto md:tw-max-w-4xl tw-p-4">
        <p>Hello</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id deserunt tempora ea aliquid iusto perspiciatis eaque, saepe, quis mollitia cumque dicta repellendus optio soluta nostrum eos quasi, facilis iure blanditiis!
        </p>
      </div>
    </Wrapper>
  )
}

export default App;
