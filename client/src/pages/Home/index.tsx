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
  breederror: boolean,
  breeds: IBreed[],
  dogImages: string[],
  breedsLoading: boolean,
  dogImagesLoading: boolean,
  imageerror: boolean,
}

interface IHomeState {
  breed: string|null,
  pageNow: number,
  renderDogImages: string[],
}

class Home extends React.Component<IHomeProps, IHomeState> {
  private itemPerPage:number = 60
  private tempStyle:any[] = []
  private col:number
  private countImg:number = 0
  private isLoadingMore:boolean = false
  constructor(props: IHomeProps) {
    super(props)
    this.state = {
      breed: null,
      pageNow: 1,
      renderDogImages: [],
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubbreedChange = this.handleSubbreedChange.bind(this)
    this.loadMore = this.loadMore.bind(this)
    // this.rerange = this.rerange.bind(this)
  }

  public getCol() {
    const windowWidth:number = window.innerWidth;
    if(windowWidth<576) {
      this.col = 2
    }
    if(windowWidth>=576 && windowWidth<786){
      this.col = 3
    }
    if(windowWidth>=786 && windowWidth<992){
      this.col = 4
    }
    if(windowWidth>=992 && windowWidth<1200){
      this.col = 5
    }
    if(windowWidth>=1200){
      this.col = 6
    }
  }

  public waterFall() {
    this.getCol();
    this.tempStyle = [];
    const grid:any = this.refs.grid;
    const children = Array.from(grid.children);
    const loadMore: any = this.refs.loadMore;
    if(children.length > 0) {
      children.forEach((e:any, i:number) => {
        const height = e.clientHeight;
        const width = e.clientWidth;
        const left = width * (i % this.col) + 'px';
        e.style.left = left;
        
        if ((i / this.col) < 1) {
          
          for(let i=0; i<this.col; i++) {
            this.tempStyle.push(0);
          }
        }
        const top: number = this.tempStyle[ i % this.col];
        e.style.top = top + 'px';
        this.tempStyle[ i % this.col ] = top + height;
        setTimeout(()=>{
          e.style.opacity = 1;
        }, 500)
        
      })
    }
    grid.style.height = Math.max.apply(null,this.tempStyle) + 'px';
    loadMore.style.opacity = 1;
  }
  public componentDidMount() {
    this.props.actions.getItems();
    this.getCol();
    window.onresize = () => {
      this.waterFall()
    }
  }
  public loadMore() {
    if(this.isLoadingMore){
      return
    }
    this.isLoadingMore = true;
    const pageNow = this.state.pageNow + 1;
    const dImages = this.props.dogImages.slice(0, pageNow*this.itemPerPage);
    this.setState({
      pageNow,
      renderDogImages: dImages,
    }, ()=>{
      this.isLoadingMore = false;
    })
  }
  public componentWillReceiveProps(nextProps:any) {
    if (this.props.dogImages[0] !== nextProps.dogImages[0]) {
      const dImages = nextProps.dogImages.slice(0,1*this.itemPerPage);
      this.setState({
        renderDogImages: dImages,
      })
    }
    
  }
  public handleChange(e: any) {
    this.tempStyle = [];
    this.setState({
      breed: e.target.value
    });
    this.props.actions.getImages(e.target.value);
  }
  public handleSubbreedChange(e: any) {
    this.tempStyle = [];
    this.props.actions.getImages(this.state.breed, e.target.value);
  }
  public rerange(i:number, e:any) {
    e.target.parentElement.style.opacity = 0;
    this.countImg++;
    if(this.countImg%this.itemPerPage===0||this.countImg===this.props.dogImages.length){
      this.waterFall();
    }
  }
  public render() {
    const { breederror, breeds, dogImages, breedsLoading, dogImagesLoading, imageerror } = this.props;
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
        <div className="main">
          {dogImagesLoading?
            (<div className="images-loading"><Loading /></div>):null
          }
          {breederror||imageerror?(<p className="error">Network error</p>):(
            <div className="grid" ref="grid">
            {renderDogImages.map((e: string, i: number) => {
              return (
                <div 
                  className="block" 
                  key={`dogImg${i}`}
                  style={{opacity:0}}
                >
                  <img 
                    src={e} 
                    onLoadCapture={this.rerange.bind(this,i)} 
                  />
                </div>
              )
            })}
          </div>
          )}
        </div>
        {
          dogImages.length <= renderDogImages.length?null:(
            <button 
              ref="loadMore"
              onClick={this.loadMore} 
              className="load-more" 
              style={{opacity:0}}
            >
              More...
            </button>
          )
        }
        
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    breederror: state.homeReducer.breederror,
    breeds: state.homeReducer.breeds,
    breedsLoading: state.homeReducer.isLoading,
    dogImages: state.dogImagesReducer.dogImages,
    dogImagesLoading: state.dogImagesReducer.isLoading,
    imageerror: state.dogImagesReducer.imageerror,
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