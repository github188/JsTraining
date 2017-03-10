import { GroupInfo } from './groupInfo';

export class BizInfo {
    public biz_guid: string;
    public biz_name: string;
    public owner_guid: string;
    public user_group: number;
    public groupList: GroupInfo[];
}
