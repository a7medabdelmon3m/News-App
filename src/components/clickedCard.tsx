import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import NewsCard from "./newsCard";
import { ArticleType } from "@/services/newServices";
const mockUpNew: ArticleType = 
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga voluptas, doloremque natus dicta incidunt molestias. Sed, saepe exercitationem culpa nam, cum labore quis consectetur ducimus aut temporibus maxime aspernatur? Fugiat?",
      publishedAt:'10/8/2026',
      author:'ahmed abdelmoneim',
      urlToImage:`https://images.unsplash.com/photo-1505968409348-bd000797c92e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
      content:'',
      description:'',
      source: { id: null, name: "" },
      url:''
  }
  export type prop = {
    handleCloseSelectedCard:(val:boolean) => void
    selctedCardData:ArticleType
  }
export default function ClickedCard({handleCloseSelectedCard , selctedCardData}:prop) {
  return (
    <Modal transparent={true} statusBarTranslucent={true}>
        <Pressable onPress={() => handleCloseSelectedCard(false)} style={[styles.overlay]}>
            <NewsCard cardDetails={selctedCardData} isSelectedCard={true} />
        </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    overlay:{
        backgroundColor:'#1212128F',
        padding:16,
        height:'100%',
        display:'flex',
        justifyContent:'flex-end'
    }
})
