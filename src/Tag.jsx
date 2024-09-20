import styled from "styled-components";

const StyledTag = styled.span`
    border: 1px solid rgba(148, 145, 145, 0.1);
    padding: 4px;
    width: 150px;
    display: flex;
    align-items: center;
    gap: 5px;
`

function Tag({ tag }) {
    return (
        <StyledTag>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Location_dot_lightgrey.svg" alt="" height="10px" />
            <span>{tag}</span>
        </StyledTag>
    );
}

export default Tag;