import { useState, useEffect } from "react";

import { Table, Icon, Button } from "semantic-ui-react";

import { runApi } from "../../services/services";
import fileService from "../../services/file.service";

const FolderTree = ({ releasePath, onSave, onCancel }) => {
  const [path, setPath] = useState(releasePath);
  const [contents, setContents] = useState(null);

  useEffect(() => {
    runApi(() => fileService.getFolderContents(path), setContents);
  }, [path]);

  const setParentPath = () => {
    if (path.indexOf("\\") === -1) setPath("");
    else {
      setPath(path.substring(0, path.lastIndexOf("\\")));
    }
  };

  return (
    <div>
      <h4>{"\\" + path}</h4>
      <Table compact size='small'>
        <Table.Body>
          <Table.Row>
            <Table.Cell onClick={setParentPath} style={{ cursor: "pointer" }}>
              ..
            </Table.Cell>
          </Table.Row>
          {contents !== null
            ? contents.map((folder) => {
                return (
                  <Table.Row>
                    <Table.Cell
                      onClick={() => {
                        if (folder.fileType === "folder") {
                          setPath(folder.fullPath);
                        }
                      }}
                      style={{
                        cursor:
                          folder.fileType === "folder" ? "pointer" : "default",
                      }}
                    >
                      <Icon
                        name={
                          folder.fileType === "file"
                            ? "file outline"
                            : folder.fileType
                        }
                        color={
                          folder.fileType === "folder" ? "yellow" : "white"
                        }
                      />
                      {folder.folderName}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
      </Table>
      <Button color='green' size='mini' onClick={() => onSave(path)}>
        <Icon name='save' />
        Save Selected Folder
      </Button>
      <Button color='white' size='mini' onClick={onCancel}>
        <Icon name='x' />
        Cancel
      </Button>
    </div>
  );
};

export default FolderTree;
