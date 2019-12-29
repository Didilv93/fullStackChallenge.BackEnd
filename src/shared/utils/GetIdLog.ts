import * as contextService from 'request-context';

export default function obterLogId(): Object {
	return { idLog: contextService.get('request:idLog') };
}