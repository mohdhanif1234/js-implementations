// AUTO RETRY PROMISES
const wait = (delay) => new Promise(resolve => setTimeout(resolve, delay))

const mainFn = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) resolve({ id: 1, name: 'Hanif' })
            else reject('Kuch toh gadbad ho gayi')
        }, delay);
    })
}

const retryFunction = async (mainFn, retries, delay, finalErrMsg = 'Finally sab attempts fail ho gaye') => {
    try {
        const result = await mainFn(delay);
        return result
    } catch (error) {
        if (retries <= 0) {
            console.log('Saare attempts khatam ho gaye')
            return Promise.reject(finalErrMsg)
        }
        console.log('Error bhi aa gayi---', error)
        console.log('Retrying... attempts left---', retries - 1)
        await wait(1000)
        return retryFunction(mainFn, retries - 1, delay)
    }
}

const main = async () => {
    try {
        const result = await retryFunction(mainFn, 5, 1000);
        console.log('Final result---', result)
    } catch (error) {
        console.log('Final error is---', error)
    }
}

main()