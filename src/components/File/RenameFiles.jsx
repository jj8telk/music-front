import { useState, useEffect } from "react";

import { Table, Button, Icon } from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

const RenameFiles = ({ releaseId, onSave, onCancel }) => {
  const [fileList, setFileList] = useState(null);

  useEffect(() => {
    runApi(() => releaseService.previewRenameFiles(releaseId), setFileList);
  }, []);

  return (
    <div>
      {fileList !== null ? (
        <>
          <Table compact size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Current Path</Table.HeaderCell>
                <Table.HeaderCell>Standardized Path</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {fileList.map((file) => {
                return (
                  <Table.Row>
                    <Table.Cell>{file.path}</Table.Cell>
                    <Table.Cell>{file.standard}</Table.Cell>
                    <Table.Cell>
                      {file.path !== file.standard ? (
                        <Icon name='exclamation circle' color='yellow' />
                      ) : (
                        <Icon name='check' color='green' />
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          <Button color='green' onClick={onSave} size='mini'>
            <Icon name='save' />
            Rename Files
          </Button>
          <Button color='white' size='mini' onClick={onCancel}>
            <Icon name='x' />
            Cancel
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default RenameFiles;
