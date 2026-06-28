let mainGroupsPromise = null;

async function GetMainGroups(){
    if (!(mainGroupsPromise)){
        mainGroupsPromise = await fetchGroups()
    }
    return mainGroupsPromise
}