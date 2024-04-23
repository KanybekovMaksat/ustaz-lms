import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TableContainer,
  Paper,
  Pagination,
} from '@mui/material';

const ScoreTable = ({ data, onScoreChange }) => {
  const [editableCell, setEditableCell] = useState(null);
  const [highlightedHeader, setHighlightedHeader] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleTdHover = (studentId) => {
    setHighlightedHeader(studentId);
  };

  const handleTdMouseLeave = () => {
    setHighlightedHeader(null);
  };

  const handleEditCell = (studentId, lessonIndex) => {
    setEditableCell({ studentId, lessonIndex });
  };

  const handleSaveScore = () => {
    setEditableCell(null);
  };

  const handleCancelEdit = () => {
    setEditableCell(null);
  };

  const isCellEditable = (studentId, lessonIndex) => {
    return (
      editableCell &&
      editableCell.studentId === studentId &&
      editableCell.lessonIndex === lessonIndex
    );
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <StyledTable>
      <TableContainer component={Paper} sx={{ background: '#0f2342' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>ФИО</TableCell>
              {data[0].scores
                .slice(startIndex, endIndex)
                .map((score, lessonIndex) => (
                  <TableCell key={lessonIndex} style={{ maxWidth: '10%' }}>
                    {score.lesson}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(startIndex, endIndex).map((student, studentIndex) => (
              <TableRow key={studentIndex}>
                <TableCell
                  className={
                    highlightedHeader === student.id ? 'highlighted' : ''
                  }
                >
                  {startIndex + studentIndex + 1}
                </TableCell>
                <TableCell
                  className={
                    highlightedHeader === student.id ? 'highlighted' : ''
                  }
                >
                  {student.name}
                </TableCell>
                {student.scores
                  .slice(startIndex, endIndex)
                  .map((score, lessonIndex) => (
                    <TableCell
                      onMouseEnter={() => handleTdHover(student.id)}
                      onMouseLeave={handleTdMouseLeave}
                      key={lessonIndex}
                      onClick={() =>
                        handleEditCell(student.id, lessonIndex + startIndex)
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      {isCellEditable(student.id, lessonIndex + startIndex) ? (
                        <div>
                          <input
                            type="number"
                            value={score.score}
                            onChange={(e) =>
                              onScoreChange(
                                student.id,
                                lessonIndex + startIndex,
                                e.target.value
                              )
                            }
                          />
                          <Button onClick={handleSaveScore}>Сохранить</Button>
                          <Button onClick={handleCancelEdit}>Отмена</Button>
                        </div>
                      ) : (
                        score.score
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <Pagination
          color="info"
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </StyledTable>
  );
};

export default ScoreTable;

const StyledTable = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    overflow: hidden;
  }
  .highlighted {
    font-weight: 900;
  }
  td:hover {
    font-weight: 900;
  }
  button {
    margin: 15px 15px 15px 0px;
    padding: 6px 25px;
    border: none;
    border-radius: 2px;
    color: auto;
  }
`;
