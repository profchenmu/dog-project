import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from '../../redux/actions/homeActions';
import Loading from '../Loading';
import './home.less';

interface IBreed {
  breed?: string,
  subbreed?: string[]
}
interface IHomeProps {
  actions: any,
  breeds: IBreed[],
  dogImages: string[],
  breedsLoading: boolean,
  dogImagesLoading: boolean,
}

interface IHomeState {
  breed: string|null,
  pageNow: number,
  renderDogImages: string[]
}

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)
    this.state = {
      breed: null,
      pageNow: 1,
      renderDogImages: [],
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubbreedChange = this.handleSubbreedChange.bind(this)
  }
  itemPerPage:number = 10

  public componentDidMount() {
    this.props.actions.getItems();
    // document.title = 'home';
  }
  public componentWillReceiveProps(nextProps:any) {
    const dImages = nextProps.dogImages.splite(0, 10);
    this.setState({
      renderDogImages: dImages,
    })
  }
  public handleChange(e: any) {
    this.setState({
      breed: e.target.value
    });
    this.props.actions.getImages(e.target.value);
  }
  public handleSubbreedChange(e: any) {
    this.props.actions.getImages(this.state.breed, e.target.value);
  }
  public render() {
    const { breeds, dogImages, breedsLoading, dogImagesLoading } = this.props;
    const { breed, renderDogImages } = this.state;
    const items:IBreed = breeds.find((e:any)=>{
      return e.breed === breed;
    }) || {}
    
    const subbreeds = items.subbreed || [];

    return (
      <div className="home">
        
      <div className="container header">
        
        <div className="row">
        <div className="input-group col-6">
          {breedsLoading?
            (<div className="breed-loading"><Loading /></div>):null
          }
          <select onChange={this.handleChange} className="custom-select">
            <option>Breed...</option>
            {breeds.map((e:IBreed, i:number)=>{
              return (<option key={`breeds${i}`} value={e.breed}>{e.breed}</option>)
            })}
          </select>
        </div>
        <div className="input-group col-6">
          {breedsLoading?
            (<div className="breed-loading"><Loading /></div>):null
          }
          <select onChange={this.handleSubbreedChange} className="custom-select">
            <option>Sub Breed...</option>
            {subbreeds.map((e:string, i:number)=>{
              return (<option key={`subbreeds${i}`} value={e}>{e}</option>)
            })}
          </select>
        </div>
      </div>
      </div>   
      {/* </nav> */}
        <div className="container main">
          {dogImagesLoading?
            (<div className="images-loading"><Loading /></div>):null
          }
          <div className="grid">
            {dogImages.map((e: string, i: number) => {
              return (
                <div className="block" key={`dogImg${i}`}>
                  <img src={e} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    breeds: state.homeReducer.breeds,
    breedsLoading: state.homeReducer.isLoading,
    dogImages: state.dogImagesReducer.dogImages,
    dogImagesLoading: state.dogImagesReducer.isLoading,
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(homeActions, dispatch as any)
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)