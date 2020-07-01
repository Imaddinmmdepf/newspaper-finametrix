
import axios from "axios";

const baseUrl = "http://localhost:4000/"
export default {
    postNew(url = baseUrl + 'postNews/') {
        
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update : (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete : id => axios.delete(url + id),
            archiveNew: (id )=> axios.post(url + "archived/" + id),
            fetchArchiveNew: () => axios.get(url + "archived")
        }
    }
}