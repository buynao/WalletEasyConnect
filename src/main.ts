import '@geist-ui/style'
import './style.css'
import { ethers } from 'ethers'

const app = document.querySelector<HTMLDivElement>('#app')!

const main = async () => {
  let signer = null as any
  const signHandler = async () => {
    try {
      const result = await signer.signMessage('hello imToken!')
      document.querySelector('#result')!.innerHTML = `
      Signature Result: ${result}
    `.trim()
    } catch (err) {
      alert(err.message)
    }
  }
  const getBalance = async () => {
    console.log((window as any).imToken)
    console.log((window as any).ethereum)
    try {
      const result = await signer.getBalance()
      document.querySelector('#balance')!.innerHTML = `
      Balance: ${result}
    `.trim()
    } catch (err) {
      alert(err.message)
    }
  }
  const connect = async () => {
    await (window as any).ethereum.enable()
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)

    signer = provider.getSigner()
    const address = await signer.getAddress()
    document.querySelector('#address')!.innerHTML = `${address}`
  }
  const el = document.querySelector('#toSign')!
  el.removeAttribute('onclick')
  el!.addEventListener('click', signHandler)

  const el1 = document.querySelector('#getBalance')!
  el1.removeAttribute('onclick')
  el1!.addEventListener('click', getBalance)

  const e2 = document.querySelector('#connect')!
  e2.removeAttribute('onclick')
  e2!.addEventListener('click', connect)
}

app.innerHTML = `
  <section>
    <h3>Hello imToken</h3>
    <p>1. address.</p>
    <pre class="zi-dark" id="address">Adderss: Unconnected</pre>
    <br>
    <p>2. Signing of the following strings:</p>
    <pre class="zi-dark" id="result">Signature Result: </pre>
    <button class="zi-btn primary small auto" id="toSign" onclick="alert('Unconnected')">Sign</button>
    <br>
    <p>3. Click connect wallet to get wallet adress balance.</p>
    <pre class="zi-dark" id="balance">Balance: Unconnected1</pre>
    <button class="zi-btn primary small auto" id="getBalance" onclick="alert('Unconnected')">Get Balance</button>
    <br>
    <button class="zi-btn primary small auto" id="connect" onclick="alert('Unconnected')">Connect to Wallet</button>
  </section>
`
main().catch(err => console.log(err))
