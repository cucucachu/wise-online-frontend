import React from 'react';
import { v4 as uuid } from 'uuid';
import {Card} from '../Card';

export type AllowedURLEntity = {
    id: string;
    url: string;
}

type AllowedURLRowProps = {
    urlEntity: AllowedURLEntity;
    onChange(urlEntity: AllowedURLEntity): void;
    onRemove(urlEntity: AllowedURLEntity): void;
}

const AllowedURLRow: React.FC<AllowedURLRowProps> = ({ urlEntity, onChange, onRemove }) => {
    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback((e) => {
        onChange({
            ...urlEntity,
            url: e.currentTarget.value,
        });

    }, [onChange, urlEntity]);

    const onBlurInput: React.FocusEventHandler<HTMLInputElement> = React.useCallback((e) => {
        const url = new URL(e.currentTarget.value);
        
        onChange({
            ...urlEntity,
            url: url.host,
        });

    }, [onChange, urlEntity]);

    const handleClickRemove = React.useCallback(() => {
        onRemove(urlEntity);
    }, [urlEntity, onRemove]);

    return (
        <tr>
            <td>
              <input
                type="text"
                placeholder="google.com"
                onChange={onChangeInput}
                onBlur={onBlurInput}
                value={urlEntity.url}
                />
           </td>
           <td>
                <a href='#' onClick={handleClickRemove}>Remove</a>
           </td>
        </tr>
    );
};

type AllowedURLTableProps = {
    urls: AllowedURLEntity[];
    onChangeUrls(urls: AllowedURLEntity[]): void;
}

export const AllowedURLEditor: React.FC<AllowedURLTableProps> = ({ urls, onChangeUrls }) => {
    const onChangeUrl = React.useCallback((urlToUpdate: AllowedURLEntity) => {
        onChangeUrls(urls.map(url => {
            if (urlToUpdate.id === url.id) {
                return urlToUpdate;
            }

            return url;
        }));
    }, [onChangeUrls, urls]);

    const onRemoveUrl = React.useCallback((urlToRemove: AllowedURLEntity) => {
        onChangeUrls(urls.filter(url => {
            return url.id !== urlToRemove.id;
        }));
    }, [onChangeUrls, urls]);

    const handleClickAdd = React.useCallback(() => {
        onChangeUrls(urls.concat([
            {
                id: uuid(),
                url: '',
            }
        ]))
    }, [urls, onChangeUrls]);

  return (
    <Card>
        <Card.Body>
            <h4>Allowed Website URLs for Students</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map(url => <AllowedURLRow key={url.id} urlEntity={url} onChange={onChangeUrl} onRemove={onRemoveUrl} />)}
                </tbody>
            </table>
            <p><a onClick={handleClickAdd}>Add</a></p>
      </Card.Body>
    </Card>
  );
};
