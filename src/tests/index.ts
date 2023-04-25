import {parseBics} from "../utils/xmlParser.js";

const xmlWithMissingParticipant = '<BICDirectoryEntry BIC="000816041">\n' +
    '<Accounts Account="40116810008160010022" RegulationAccountType="TRSA" CK="04" AccountCBRBIC="040816000" DateIn="2013-03-26" AccountStatus="ACAC"/>\n' +
    '</BICDirectoryEntry>';

const xmlWithMissingAccount = '<BICDirectoryEntry BIC="000816041">\n' +
    '<ParticipantInfo NameP="УФК по Хабаровскому краю" CntrCd="RU" Rgn="08" Ind="680000" Tnp="г" Nnp="Хабаровск" Adr="ул Дзержинского, 41" DateIn="2011-03-03" PtType="52" Srvcs="3" XchType="1" UID="0816000041" ParticipantStatus="PSAC"/>\n' +
    '</BICDirectoryEntry>';

const xmlWithOneBic = '<BICDirectoryEntry BIC="000816041">\n' +
    '<ParticipantInfo NameP="УФК по Хабаровскому краю" CntrCd="RU" Rgn="08" Ind="680000" Tnp="г" Nnp="Хабаровск" Adr="ул Дзержинского, 41" DateIn="2011-03-03" PtType="52" Srvcs="3" XchType="1" UID="0816000041" ParticipantStatus="PSAC"/>\n' +
    '<Accounts Account="40116810008160010022" RegulationAccountType="TRSA" CK="04" AccountCBRBIC="040816000" DateIn="2013-03-26" AccountStatus="ACAC"/>\n' +
    '</BICDirectoryEntry>';

const xmlWithManyBic = '<BICDirectoryEntry BIC="041280103"><ParticipantInfo NameP="УФК по Астраханской области" CntrCd="RU" Rgn="12" Ind="414056" Tnp="г" Nnp="Астрахань" Adr="ул Латышева, 6 Г" DateIn="2010-06-08" PtType="52" Srvcs="3" XchType="1" UID="1280002005" ParticipantStatus="PSAC"/>\n' +
    '<Accounts Account="40116810100000010010" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '<Accounts Account="40116810400000010011" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '<Accounts Account="40116810700000010012" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '<Accounts Account="40116810000000010013" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '<Accounts Account="40116810300000010014" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '<Accounts Account="40116810600000010015" RegulationAccountType="TRSA" CK="99" AccountCBRBIC="041280002" DateIn="2013-01-09" AccountStatus="ACAC"/>\n' +
    '</BICDirectoryEntry>\n' +
    '<BICDirectoryEntry BIC="000816041">\n' +
    '<ParticipantInfo NameP="УФК по Хабаровскому краю" CntrCd="RU" Rgn="08" Ind="680000" Tnp="г" Nnp="Хабаровск" Adr="ул Дзержинского, 41" DateIn="2011-03-03" PtType="52" Srvcs="3" XchType="1" UID="0816000041" ParticipantStatus="PSAC"/>\n' +
    '<Accounts Account="40116810008160010022" RegulationAccountType="TRSA" CK="04" AccountCBRBIC="040816000" DateIn="2013-03-26" AccountStatus="ACAC"/>\n' +
    '</BICDirectoryEntry>';

console.log(`Not parsing BIC with missed participant: ${parseBics(xmlWithMissingParticipant).length === 0}`);
console.log(`Not parsing BIC with missed account: ${parseBics(xmlWithMissingAccount).length === 0}`);
console.log(`Parsing one BIC: ${parseBics(xmlWithOneBic).length === 1}`);
console.log(`Parsing many BIC: ${parseBics(xmlWithManyBic).length === 7}`);
