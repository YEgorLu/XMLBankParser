type Info = {
    bic: string;
    name: string;
    corrAccount: string;
}

const BICS_REGEXP = /<BICDirectoryEntry.*?BIC="(?<bicNum>\d+)">(?<bicInner>[\w|\W]*?)<\/BICDirectoryEntry>/g;
const PARTICIPANT_REGEXP = /<ParticipantInfo.*?NameP="(?<nameP>[\w|\W]*?)".*?\/>/
const ACCOUNT_REGEXP = /<Accounts.*Account="(?<accountId>\d+)".*\/>/g

export function parseBics(xmlStr: string): Info[]{
    const ans: Info[] = [];
    for (const bicMatch of xmlStr.matchAll(BICS_REGEXP)){
        const bicNum = bicMatch.groups!['bicNum'];
        if (!bicNum)
            continue;

        const bicInner = bicMatch.groups!['bicInner'];
        const part = bicInner.match(PARTICIPANT_REGEXP);
        if (part === null)
            continue;
        const partName = part.groups!['nameP'];

        for (const accMatch of bicInner.matchAll(ACCOUNT_REGEXP)){
            const accId = accMatch.groups!['accountId'];
            ans.push({
                bic: bicNum,
                name: partName,
                corrAccount: accId
            })
        }
    }
    return ans;
}


